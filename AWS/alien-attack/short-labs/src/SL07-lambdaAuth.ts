// const AWS = require('aws-sdk')
// const JWTV = require('aws-jwt-verify')
import * as AWS from 'aws-sdk'
import * as JWTV from 'aws-jwt-verify'
const IAM = new AWS.IAM()
const CognitoISP = new AWS.CognitoIdentityServiceProvider()

// This function is only a log helper.
// Its outputs will be on Cloudwatch Logs
const log = (key: string, value: Record<string, any> | any) => {
  const strValue = JSON.stringify(value)
  console.log(`${key} : ${strValue}`)
}

export const handler = async (event: Record<string, any>) => {
  //logging the event
  log('event', event)
  let appClientId = null
  let response = null
  let token = null
  // This specifies the API Gateway method that is being called
  const methodArn = event.methodArn

  // Identifying the token source. This depends on the type of the Lambda Authorizer
  switch (event.type) {
    case 'TOKEN':
      token = event.authorizationToken
      // When using token, the ClientId is not available on the request
      // so, it must be provided by configuration
      appClientId = process.env.CLIENT_ID
      break
    case 'REQUEST':
      // this is to cope with the differences between HTTP/1 and HTTP/2 specification
      token = event.headers.authorization ? event.headers.authorization : event.headers.Authorization
      // if the App Client Id is not provided through a header, it should be provided throgh an environment variable
      appClientId = event.headers.appclientid ? event.headers.appclientid : process.env.CLIENT_ID
      break
  }
  try {
    if (!process.env.USERPOOL_ID) throw Error('USERPOOL_ID environment variable not provided.')
    if (!appClientId)
      throw Error('AppClient Id not provided neither through request nor through an environment variable.')
    console.log(`Configured UserPool Id is ${process.env.USERPOOL_ID}`)
    console.log(`ConfiguredAppClient Id is ${appClientId}`)

    // The verifier is responsible validating and decoding the token, throwing an error if invalid
    const verifier = JWTV.CognitoJwtVerifier.create({
      userPoolId: process.env.USERPOOL_ID,
      tokenUse: 'access',
      clientId: appClientId
    })
    const decoded = await verifier.verify(token, { clientId: appClientId })
    // At this point if no exception was thrown then the token is not expired and it was issued by that UserPool_ID
    log('decoded', decoded)
    // here is the subject (user id) from the token
    const user_id = decoded['sub']
    log('user_id ', user_id)

    // Let's use GET_ID to guarantee that the token was not revoked
    // We don't even need to validate anything here. We just want to guarantee that the token was not revoked
    const getUserResponse = await CognitoISP.getUser({ AccessToken: token }).promise()
    log('getUserResponse', getUserResponse)

    // here is the subject (user id) from the user record in the Cognito UserPool
    log(
      'Token valid - sub from getUser:',
      getUserResponse?.UserAttributes?.find((x) => {
        return x.Name === 'sub'
      })?.Value || 'Unvalid token'
    )

    // Getting the user's preferred role
    var caller_role = null
    if (decoded['cognito:preferred_role'])
      // if the token contains a preferred_role, let's use it
      caller_role = decoded['cognito:preferred_role']
    else {
      // if not, then let's find what's the group with lowest precedence and use it
      const cognito_groups = decoded['cognito:groups']
      log('cognito:groups', cognito_groups)
      var preferred_group = null
      for (let i = 0; i < cognito_groups!.length; i++) {
        const groupData = await CognitoISP.getGroup({
          GroupName: cognito_groups![i],
          UserPoolId: process.env.USERPOOL_ID
        }).promise()
        if (preferred_group == null || preferred_group?.Precedence! > groupData.Group?.Precedence!)
          preferred_group = groupData.Group
      }
      caller_role = preferred_group?.RoleArn
    }
    // This is the role that is going to be used for the decision
    log('caller_role', caller_role)
    log('methodArn', methodArn)
    // We use the Policy Evaluator to check if we will authorize this or not based on the preferred role of the user
    const policyEvaluationResponse = await IAM.simulatePrincipalPolicy({
      PolicySourceArn: caller_role as string,
      ActionNames: ['execute-api:Invoke'],
      ResourceArns: [methodArn]
    }).promise()
    log('policyEvaluation', policyEvaluationResponse)
    const authorized = policyEvaluationResponse.EvaluationResults![0].EvalDecision.toUpperCase() === 'ALLOWED'
    console.log(`Authorized? : ${authorized}`)
    if (authorized)
      // If authorized, generate an Allow policy for this methodArn
      response = generatePolicy(user_id, 'Allow', methodArn)
    // otherwise generate a Deny one
    else response = generatePolicy(user_id, 'Deny', methodArn)
  } catch (error: Error | any) {
    // This will happen mostly in the case of an invalid/expired token, or in case of misconfiguration
    console.log(error.message)
    log('error', error)
    response = generatePolicy('user', 'Deny', methodArn)
  }
  log('response', response)
  return response
}

// This function is just a helper to generate the policy document as expected by API Gateway
const generatePolicy = (principalId: string, effect: string, resource: string) => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
}
