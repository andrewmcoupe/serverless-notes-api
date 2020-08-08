import { APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda'

interface CustomHandler {
  (event: APIGatewayEvent, context?: Context): any
}

export default function handler(lambda: CustomHandler): CustomHandler {
  return async function (event, context): Promise<APIGatewayProxyResult> {
    let body, statusCode

    try {
      // Run the Lambda
      body = await lambda(event, context)
      statusCode = 200
    } catch (e) {
      body = { error: e.message }
      statusCode = 500
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    }
  }
}
