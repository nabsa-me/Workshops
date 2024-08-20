import { handler } from '../src/SL07-lambdaAuth'

const event: Record<string, any> = JSON.parse(`{
    "type": "REQUEST",
    "methodArn": "#METHOD_ARN#",
    "resource": "/topxstatistics",
    "path": "/topxstatistics",
    "httpMethod": "GET",
    "headers": {
        "Accept": "*/*",
        "Authorization": "#ACCESS_TOKEN#",
        "AppClientId": "#CLIENT_ID#",
        "CloudFront-Forwarded-Proto": "https",
        "CloudFront-Is-Desktop-Viewer": "true",
        "CloudFront-Is-Mobile-Viewer": "false",
        "CloudFront-Is-SmartTV-Viewer": "false",
        "CloudFront-Is-Tablet-Viewer": "false",
        "CloudFront-Viewer-ASN": "16509",
        "CloudFront-Viewer-Country": "US",
        "Host": "#API_ID#.execute-api.#REGION#.amazonaws.com",
        "User-Agent": "curl/7.88.1",
        "Via": "2.0 2385507f5b61fa8340ed5eafca1e99d0.cloudfront.net (CloudFront)",
        "X-Amz-Cf-Id": "OvPUrlEb-HwnUVNE5rSlyLTeG8d2tQxQI5J68F4rLiHIxR6-b4Zl8Q==",
        "X-Amzn-Trace-Id": "Root=1-641e0632-075b911c4b2f205469c844fd",
        "X-Forwarded-For": "3.12.73.164, 15.158.61.77",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
    },
    "multiValueHeaders": {
        "Accept": [
            "*/*"
        ],
        "Authorization": [
            "#ACCESS_TOKEN#"
        ],
        "CloudFront-Forwarded-Proto": [
            "https"
        ],
        "CloudFront-Is-Desktop-Viewer": [
            "true"
        ],
        "CloudFront-Is-Mobile-Viewer": [
            "false"
        ],
        "CloudFront-Is-SmartTV-Viewer": [
            "false"
        ],
        "CloudFront-Is-Tablet-Viewer": [
            "false"
        ],
        "CloudFront-Viewer-ASN": [
            "16509"
        ],
        "CloudFront-Viewer-Country": [
            "US"
        ],
        "Host": [
            "#API_ID#.execute-api.#REGION#.amazonaws.com"
        ],
        "User-Agent": [
            "curl/7.88.1"
        ],
        "Via": [
            "2.0 2385507f5b61fa8340ed5eafca1e99d0.cloudfront.net (CloudFront)"
        ],
        "X-Amz-Cf-Id": [
            "OvPUrlEb-HwnUVNE5rSlyLTeG8d2tQxQI5J68F4rLiHIxR6-b4Zl8Q=="
        ],
        "X-Amzn-Trace-Id": [
            "Root=1-641e0632-075b911c4b2f205469c844fd"
        ],
        "X-Forwarded-For": [
            "3.12.73.164, 15.158.61.77"
        ],
        "X-Forwarded-Port": [
            "443"
        ],
        "X-Forwarded-Proto": [
            "https"
        ]
    },
    "queryStringParameters": {
        "sessionId": "TheTestSession"
    },
    "multiValueQueryStringParameters": {
        "sessionId": [
            "TheTestSession"
        ]
    },
    "pathParameters": {},
    "stageVariables": {},
    "requestContext": {
        "resourceId": "snlebk",
        "resourcePath": "/topxstatistics",
        "httpMethod": "GET",
        "extendedRequestId": "CTXn-FaZiYcFXKA=",
        "requestTime": "24/Mar/2023:20:21:06 +0000",
        "path": "/prod/topxstatistics",
        "accountId": "123456789012",
        "protocol": "HTTP/1.1",
        "stage": "prod",
        "domainPrefix": "#API_ID#",
        "requestTimeEpoch": 1679689266715,
        "requestId": "a2457cd5-5b87-491d-a849-9c358fa39654",
        "identity": {
            "cognitoIdentityPoolId": null,
            "accountId": null,
            "cognitoIdentityId": null,
            "caller": null,
            "sourceIp": "1.23.45.678",
            "principalOrgId": null,
            "accessKey": null,
            "cognitoAuthenticationType": null,
            "cognitoAuthenticationProvider": null,
            "userArn": null,
            "userAgent": "curl/7.88.1",
            "user": null
        },
        "domainName": "#API_ID#.execute-api.#REGION#.amazonaws.com",
        "apiId": "#API_ID#"
    }
}`)

handler(event)
