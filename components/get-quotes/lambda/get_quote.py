import boto3
import json
import random
import os
from jinja2 import Environment, FileSystemLoader


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


def _render_template(quote):
    env = Environment(loader=FileSystemLoader(
        os.path.abspath(
            os.path.dirname(__file__))))
    template = env.get_template('index.html')
    rendered_template = template.render(quote=quote)
    return rendered_template


def handler(event, context):
    quotes = get_quote()

    rand_number = random.randint(0, 43)

    for x in quotes:
        if x.get('id') == rand_number:
            if event['queryStringParameters'] is None:
                body = _render_template(x.get("quote"))
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'text/html'
                    },
                    'body': body
                }
            elif 'format' in event['queryStringParameters']:
                # if event['queryStringParameters'].get('format') == 'json':
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    'body': json.dumps(
                        {
                            'quote': x.get('quote')
                        }
                    )
                }