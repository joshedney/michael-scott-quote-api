import lambda = require("@aws-cdk/aws-lambda");
import apigateway = require("@aws-cdk/aws-apigateway");
import MichaelScottApiStack = require('../../lib/michael-scott-api-stack')

export class Deploy {
  constructor(stack: MichaelScottApiStack.MichaelScottApiStack) {
    // Create the lambda function
    let fn = new lambda.Function(stack, "GetMichaelQuote", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.asset(__dirname + "/lambda/function.zip"),
      handler: "get_quote.handler",
      environment: {
          dynamoDBQuotes: stack.dynamoDBQuotes.tableName
      }
    });

    stack.dynamoDBQuotes.grantReadData(fn)

    // Add a route to the lambda function to the api gateway
    let gatewayIntegration = new apigateway.LambdaIntegration(fn)
    let deployURL = stack.apiGateway.root.addResource('quote');
    deployURL.addMethod('GET', gatewayIntegration);
  }
}
