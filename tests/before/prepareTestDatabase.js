const { Thread } = require('../../models/thread');
const { Reply } = require('../../models/reply');
const { getThreadFixtures } = require('../fixtures/getThreadFixtures');
const { getReplyFixtures } = require('../fixtures/getReplyFixtures');

const prepareTestDatabase = async () => {
  const threads = getThreadFixtures();
  let threadsIds = [];
  threads.forEach(thread => {
    const doc = new Thread(thread);
    threadsIds.push(doc._id);
    doc.save();
  });
  let replies = getReplyFixtures();
  replies.forEach((reply, index) => {
    const threadId = threadsIds[index];
    reply['thread_id'] = threadId;
    const doc = new Reply(reply);
    doc.save();
    const { _id, text, created_on, delete_password, reported } = doc;
    Thread.findByIdAndUpdate(threadId, {
      bumped_on: reply.created_on,
      $push: {
        replies: {
          _id,
          text,
          created_on,
          delete_password,
          reported
        }
      }
    });
  });
};

module.exports = { prepareTestDatabase };
