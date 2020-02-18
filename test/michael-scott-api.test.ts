import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import MichaelScottApi = require('../lib/michael-scott-api-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MichaelScottApi.MichaelScottApiStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
