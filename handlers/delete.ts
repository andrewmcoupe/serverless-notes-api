import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";
import { NOTES_TABLE_NAME } from "../constants";
import { BadRequest } from "../errors";

export const main = handler(async (event) => {
  if (!event?.pathParameters?.id) {
    return BadRequest("Path parameter ID must be provided");
  }

  const params = {
    TableName: NOTES_TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
