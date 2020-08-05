import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";
import { BadRequest } from "../errors";
import { NOTES_TABLE_NAME } from "../constants";

export const main = handler(async (event) => {
  if (!event.pathParameters?.id) {
    return BadRequest("Path parameter ID must be provided");
  }

  const params = {
    TableName: NOTES_TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});
