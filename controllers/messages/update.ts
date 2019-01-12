import { ObjectID } from 'mongodb';

import { Message } from '../../models/message';
import { AppContext } from '../../common/app';

export async function update(ctx: AppContext, next) {
  const { request } = ctx;

  const { mongoClient } = ctx;

  const messageId = ctx.params.id;
  const { chapterName, updatedLines = [], updateMany = true } = request.body;

  const collection = mongoClient.collection('messages');

  const messageRecord = await collection.findOne({
    _id: new ObjectID(messageId)
  });

  if (!messageRecord) {
    throw new Error('Message not found.');
  }

  const messageModel = new Message(messageRecord);

  messageModel.update({
    chapterName
  });

  await collection.updateOne(
    { _id: messageRecord._id },
    {
      $set: {
        ...messageModel
      }
    }
  );

  const updateResult = {
    messagesUpdated: 0
  };

  const findQuery = !updateMany
    ? {
        _id: messageRecord._id
      }
    : {
        'lines.text.japanese': {
          $in: updatedLines.map(updateLine => updateLine.japanese)
        }
      };

  const allMessages = await collection.find(findQuery).toArray();

  const updateOperations = [];

  for (const messageRecord of allMessages) {
    const messageModel = new Message(messageRecord);

    messageModel.update({
      updatedLines
    });

    const updatePromise = collection.updateOne(
      { _id: messageRecord._id },
      {
        $set: {
          ...messageModel
        }
      }
    );

    updateOperations.push(updatePromise);
  }

  await Promise.all(updateOperations);

  updateResult.messagesUpdated = updateOperations.length;

  ctx.body = updateResult;
}
