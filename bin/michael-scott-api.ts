#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MichaelScottApiStack } from '../lib/michael-scott-api-stack';

const app = new cdk.App();
new MichaelScottApiStack(app, 'MichaelScottApiStack');
