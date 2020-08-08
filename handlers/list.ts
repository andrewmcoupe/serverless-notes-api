import handler from '../libs/handler-lib'
import dynamoDb from '../libs/dynamodb-lib'
import { NOTES_TABLE_NAME } from '../constants'

export const main = handler(async (event) => {
  const params = {
    TableName: NOTES_TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  }

  const result = await dynamoDb.query(params)

  return result.Items
})
