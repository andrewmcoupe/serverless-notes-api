import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";
import { BadRequest } from "../errors";
import { NOTES_TABLE_NAME } from "../constants";

export const main = handler(async (event) => {
  if (!event.body) {
    return BadRequest("Event body must be provided");
  }

  if (!event.pathParameters?.id) {
    return BadRequest("Path parameter ID must be provided");
  }

  const data = JSON.parse(event.body);
  const params = {
    TableName: NOTES_TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
