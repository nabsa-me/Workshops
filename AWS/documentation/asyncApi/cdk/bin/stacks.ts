#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { AsyncapiRestApiExampleStack } from '../lib/asyncapi-stack'

const app = new cdk.App()
new AsyncapiRestApiExampleStack(app, 'OpenapiCdkExampleStack')
