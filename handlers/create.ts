import * as uuid from "uuid";
import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";
import { NOTES_TABLE_NAME } from "../constants";
import { BadRequest } from "../errors";

interface NoteModel {
  userId: string | null;
  noteId: string;
  content: string;
  attachment: string;
  createdAt: number;
}

// TODO: handle errors better
export const main = handler(async (event) => {
  if (!event.body) {
    return BadRequest("Event body must be provided");
  }

  const data = JSON.parse(event.body);

  const newNote: NoteModel = {
    userId: event.requestContext.identity.cognitoIdentityId,
    noteId: uuid.v1(),
    content: data.content,
    attachment: data.attachment,
    createdAt: Date.now(),
  };

  const params = {
    TableName: NOTES_TABLE_NAME,
    Item: newNote,
  };

  await dynamoDb.put(params);

  return params.Item;
});
