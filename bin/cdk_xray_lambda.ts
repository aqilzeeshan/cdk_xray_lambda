#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkXrayLambdaStack } from '../lib/cdk_xray_lambda-stack';

const app = new cdk.App();
new CdkXrayLambdaStack(app, 'CdkXrayLambdaStack');
