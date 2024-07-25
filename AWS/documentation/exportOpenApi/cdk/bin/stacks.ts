#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { OpenapiExampleStack } from '../lib/exportopenapi-stack'

const app = new cdk.App()
new OpenapiExampleStack(app, 'OpenapiCdkExampleStack')
