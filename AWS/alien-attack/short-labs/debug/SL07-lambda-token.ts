import { handler } from '../src/SL07-lambdaAuth'

const event: Record<string, any> = JSON.parse(`{
    "type": "TOKEN",
    "methodArn": "#METHOD_ARN#",
    "authorizationToken": "#ACCESS_TOKEN#"
}`)

handler(event)
