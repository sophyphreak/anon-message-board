/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const { prepareTestDatabase } = require('./before/prepareTestDatabase');
const { Thread } = require('../models/thread');
const { Reply } = require('../models/reply');

chai.use(chaiHttp);

const password = 'iamthepassword';

suite('Functional Tests', () => {
  suite('API ROUTING FOR /api/threads/:board', () => {
    before(() => {
      prepareTestDatabase();
      const threadOne = new Thread({
        text: 'before thread 1',
        delete_password: password,
        board: 'test'
      });
      const threadTwo = new Thread({
        text: 'before thread 2',
        delete_password: password,
        board: 'test'
      });
      threadOne.save();
      threadTwo.save();
    });
    after(() => {
      Thread.remove({}, err => {
        if (err) console.log(err);
      });
      Reply.remove({}, err => {
        if (err) console.log(err);
      });
    });
    suite('POST', () => {
      test('creates a new thread', done => {
        chai
          .request(server)
          .post('/api/threads/test')
          .send({
            text: 'new thread test',
            delete_password: password
          })
          .end((err, res) => {
            const thread = JSON.parse(res.body);
            assert.equal(res.status, 200, 'res.status should be 200');
            assert.isString(thread._id, 'thread._id should be a string');
            assert.isString(thread.text, 'thread.text should be string');
            assert.equal(
              thread.text,
              'new thread text',
              'new thread text should equal input text'
            );
            assert.isString(
              thread.delete_password,
              'thread.delete_password should be string'
            );
            assert.equal(
              thread.delete_password,
              password,
              'thread.delete_password should be iamthepassword'
            );
            assert.isNumber(
              thread.created_on.valueOf(),
              'thread.created_on should be a moment object'
            );
            assert.isNumber(
              thread.bumped_on.valueOf(),
              'thread.bumped_on should be a moment object'
            );
            assert.isBoolean(
              thread.reported,
              'thread.reported should be a boolean'
            );
            assert.equal(
              thread.reported,
              false,
              'thread.reported should be false'
            );
            assert.isArray(thread.replies, 'thread.replies should be an array');
            assert.isNotOk(thread.replies[0], 'thread.replies should be empty');
            done();
          });
      });
    });

    suite('GET', () => {
      test('gets a list of most recent 10 bumped threads and 3 bumped replies threads', done => {
        chai
          .request(server)
          .get('/api/threads/test')
          .end((err, res) => {
            const { threads, replies } = JSON.parse(res.body);
            assert.equal(res.status, 200, 'res.status should be 200');
            assert(threads.length === 10, 'should be 10 threads');
            assert(replies.length === 3, 'should be 3 replies');
            threads.forEach((curThread, index) => {
              if (index !== 0) {
                const prevThread = threads[index - 1];
                assert(
                  prevThread.bumped_on.valueOf() <
                    curThread.bumped_on.valueOf(),
                  'the previous bumped_on should be before the current one'
                );
              }
              assert.notProperty(
                curThread,
                'reported',
                'should not have reported property'
              );
              assert.notProperty(
                curThread,
                'delete_password',
                'should not have delete_password property'
              );
              assert.property(curThread, 'text', 'should have text property');
              assert.isString(curThread.text, 'text should be a string');
              assert.property(
                curThread,
                'created_on',
                'should have created_on property'
              );
              assert.isNumber(
                curThread.created_on.valueOf(),
                'created_on should be valid moment object'
              );
              assert.property(
                curThread,
                'bumped_on',
                'should have bumped_on property'
              );
              assert.isNumber(
                curThread.bumped_on.valueOf(),
                'bumped_on should be valid moment object'
              );
              assert.property(
                curThread,
                'replies',
                'should have replies property'
              );
              assert.isArray(curThread.replies, 'replies should be an array');
              assert.property(curThread, 'board', 'should have board property');
              assert.isString(curThread.board, 'board should be a string');
            });
            replies.forEach((curReply, index) => {
              if (index !== 0) {
                const prevReply = replies[index - 1];
                assert(
                  prevReply.bumped_on.valueOf() < curReply.bumped_on.valueOf(),
                  'the previous bumped_on should be before the current one'
                );
              }
              assert.notProperty(
                curReply,
                'reported',
                'should not have reported property'
              );
              assert.notProperty(
                curReply,
                'delete_password',
                'should not have delete_password property'
              );
              assert.property(curReply, 'text', 'should have text property');
              assert.isString(curReply.text, 'text should be a string');
              assert.property(
                curReply,
                'created_on',
                'should have created_on property'
              );
              assert.isNumber(
                curReply.created_on.valueOf(),
                'created_on should be valid moment object'
              );
              assert.property(
                curReply,
                'thread_id',
                'should have thread_id property'
              );
              assert.isString(
                curReply.thread_id,
                'thread_id should be a string'
              );
            });
            done();
          });
      });
    });

    suite('DELETE', () => {});

    suite('PUT', () => {});
  });

  suite('API ROUTING FOR /api/replies/:board', () => {
    suite('POST', () => {});

    suite('GET', () => {});

    suite('PUT', () => {});

    suite('DELETE', () => {});
  });
});
