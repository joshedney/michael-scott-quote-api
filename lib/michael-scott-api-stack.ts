import cdk = require('@aws-cdk/core');
import apigateway = require('@aws-cdk/aws-apigateway')
import dynamodb = require('@aws-cdk/aws-dynamodb')

export class MichaelScottApiStack extends cdk.Stack {

  apiGateway: apigateway.RestApi
  dynamoDBQuotes: dynamodb.Table
  components: any = []

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.initApiGateway();
    this.initDynamoDB();

    let components = [
      "get-quotes"
    ]
    for (var i in components) {
      this.components[components[i]] = new (require('../components/' + components[i] + '/deploy').Deploy)(this)
    }
  }

  initApiGateway() {
    const api = new apigateway.RestApi(this, "ms-api-gw", {
      restApiName: "MichaelScottApiGateway",
      description: "Api gateway used for getting Michael Scott quotes"
    });

    this.apiGateway = api;
  }

  initDynamoDB() {
    let db = new dynamodb.Table(this, 'quotes', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });
    this.dynamoDBQuotes = db;
  }
}
