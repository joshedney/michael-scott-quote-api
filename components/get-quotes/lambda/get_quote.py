import boto3
import json
import random
import os


dynamodb_client = boto3.client('dynamodb')


def get_quote():
    r = dynamodb_client.get_item(
        TableName=os.environ['dynamoDBQuotes'],
        Key={
            'id': {
                'S': 'quotes'
            }
        }
    )

    return json.loads(r['Item']['data']['S'])


def handler(event, context):
    quotes = get_quote()

    rand_number = random.randint(0, 43)

    for x in quotes:
        if x.get('id') == rand_number:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': json.dumps(
                    {
                        "quote": x.get("quote")
                    }
                )
            }

    return{
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps(quotes)
    }
