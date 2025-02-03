#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { OpenapiCdkExampleStack } from '../lib/openapi-stack'

const app = new cdk.App()
new OpenapiCdkExampleStack(app, 'OpenapiCdkExampleStack')
