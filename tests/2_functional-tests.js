/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chaiHttp = require('chai-http');
const chai = require('chai');
const moment = require('moment');
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
      Thread.deleteMany({}, err => {
        if (err) console.log(err);
      });
      Reply.deleteMany({}, err => {
        if (err) console.log(err);
      });
      prepareTestDatabase();
      const threadOne = new Thread({
        text: 'before thread 1',
        delete_password: password,
        board: 'test',
        bumped_on: moment('1988-01-01'),
        created_on: moment('1988-01-01')
      });
      const threadTwo = new Thread({
        text: 'before thread 2',
        delete_password: password,
        board: 'test',
        bumped_on: moment('1988-01-01'),
        created_on: moment('1988-01-01')
      });
      threadOne.save();
      threadTwo.save();
    });
    suite('POST', () => {
      test('creates a new thread', done => {
        chai
          .request(server)
          .post('/api/threads/test')
          .send({
            text: 'new thread text',
            delete_password: password,
            bumped_on: moment('1988-01-01'),
            created_on: moment('1988-01-01')
          })
          .end(async (err, res) => {
            const thread = await Thread.findOne({ text: 'new thread text' });
            assert.equal(res.status, 200, 'res.status should be 200');
            assert(thread._id, 'thread._id should exist');
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
              moment(thread.created_on).valueOf(),
              'thread.created_on should be a moment object'
            );
            assert.isNumber(
              moment(thread.bumped_on).valueOf(),
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
            const { threads, replies } = res.body;
            assert.equal(res.status, 200, 'res.status should be 200');
            assert(threads.length === 10, 'should be 10 threads');
            assert(replies.length === 3, 'should be 3 replies');
            threads.forEach((curThread, index) => {
              if (index !== 0) {
                const prevThread = threads[index - 1];
                assert(
                  moment(prevThread.bumped_on).valueOf() >
                    moment(curThread.bumped_on).valueOf(),
                  'the previous bumped_on thread should be after the current one'
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
                moment(curThread.created_on).valueOf(),
                'created_on should be valid moment object'
              );
              assert.property(
                curThread,
                'bumped_on',
                'should have bumped_on property'
              );
              assert.isNumber(
                moment(curThread.bumped_on).valueOf(),
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
                  moment(prevReply.created_on).valueOf() >
                    moment(curReply.created_on).valueOf(),
                  'the previous created_on reply should be after the current one'
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
                moment(curReply.created_on).valueOf(),
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
              assert.property(curReply, 'board', 'should have a board');
            });
            if (err) {
              console.log('error:', err);
            }
            done();
          });
      });
    });

    suite('DELETE', () => {
      test('delete a thread successfully', async () => {
        const { _id, delete_password } = await Thread.findOne({
          text: 'before thread 1'
        });
        return chai
          .request(server)
          .delete('/api/threads/test')
          .send({ thread_id: _id, delete_password })
          .end(async (err, res) => {
            const { text } = res;
            assert.equal(res.status, 200, 'status should be 200');
            assert.isString(text);
            assert.equal(
              text,
              'success',
              'the response for passing correct id and password should be delete success'
            );
            const thread = await Thread.findOne({
              text: 'before thread 1'
            });
            assert.isNotOk(thread, 'thread should not exist in database');
            if (err) {
              console.log('error:', err);
            }
          });
      });
      test('fail to delete a thread', async () => {
        const { _id } = await Thread.findOne({ text: 'before thread 2' });
        return chai
          .request(server)
          .delete('/api/threads/test')
          .send({ thread_id: _id, delete_password: 'wrongPassword ' })
          .end(async (err, res) => {
            const { text } = res;
            assert.isString(text);
            assert.equal(
              text,
              'incorrect password',
              'the response for passing wrong password should be delete failure'
            );
            const thread = await Thread.findOne({
              text: 'before thread 2'
            });
            assert(thread, 'thread should exist in database');
            if (err) {
              console.log('error:', err);
            }
          });
      });
    });

    suite('PUT', () => {
      test('report a thread with success', async () => {
        const { _id } = await Thread.findOne({ text: 'before thread 2' });
        return chai
          .request(server)
          .put('/api/threads/test')
          .send({ thread_id: _id })
          .end(async (err, res) => {
            const { text } = res;
            assert(res.status, 200, 'res.status should be 200');
            assert.isString(text);
            assert.equal(
              text,
              'success',
              'should receive success for reporting thread'
            );
            const thread = await Thread.findById(_id);
            assert(thread.reported, 'thread.reported should now be true');
            if (err) {
              console.log('error:', err);
            }
          });
      });
    });
  });

  suite('API ROUTING FOR /api/replies/:board', () => {
    suite('POST', () => {
      test('submit a new reply to a board and thread', async () => {
        const { _id } = await Thread.findOne({ text: 'before thread 2' });
        return chai
          .request(server)
          .post('/api/replies/test')
          .send({
            text: 'new reply in test',
            delete_password: password,
            thread_id: _id
          })
          .end(async (err, res) => {
            const reply = await Reply.findOne({ text: 'new reply in test' });
            assert.equal(res.status, 200, 'res.status should be 200');
            assert.isString(reply.text, 'reply.text should be a string');
            assert.equal(
              reply.text,
              'new reply in test',
              'reply.text should equal input text'
            );
            assert.isString(
              reply.delete_password,
              'reply.delete_password should be string'
            );
            assert.equal(
              reply.delete_password,
              password,
              'reply.delete_password should be saved password'
            );
            assert.isString(
              reply.thread_id,
              'reply.thread_id should be a string'
            );
            assert.isNumber(
              moment(reply.created_on).valueOf(),
              'reply.created_on should be valid moment object'
            );
            assert.isBoolean(
              reply.reported,
              'reply.reported should be a boolean'
            );
            assert.equal(
              reply.reported,
              false,
              'reply.reported should be false'
            );
            assert.isString(reply.board, 'reply.board should be a string');
            assert.equal(reply.board, 'test', 'reply.board should be test');

            const { bumped_on, replies } = await Thread.findById(
              reply.thread_id
            );
            assert.isArray(replies, 'replies should be an array');
            assert.equal(
              replies.length,
              1,
              'replies array should have a length of 1'
            );
            assert.isOk(replies[0]._id, 'replies[0]._id should exist');
            assert.isString(
              replies[0].text,
              'replies[0].text in thread array should be a string'
            );
            assert.equal(
              replies[0].text,
              'new reply in test',
              'replies[0].text should equal input value'
            );
            assert.isNumber(
              moment(replies[0].created_on).valueOf(),
              'replies[0].created_on should be valid moment object'
            );
            assert.isString(
              replies[0].delete_password,
              'replies[0].delete_password should be a string'
            );
            assert.equal(
              replies[0].delete_password,
              password,
              'replies[0].delete_password should be the password'
            );
            assert.isBoolean(
              replies[0].reported,
              'replies[0].reported should be a boolean'
            );
            assert.equal(
              replies[0].reported,
              false,
              'replies[0].reported should be false'
            );
            assert.isNumber(
              moment(bumped_on).valueOf(),
              'thread bumped_on should be a valid moment object'
            );
            assert.equal(
              bumped_on,
              reply.created_on,
              'thread bumped_on and reply created_on should be equal'
            );
          });
      });
    });

    suite('GET', () => {});

    suite('PUT', () => {});

    suite('DELETE', () => {});
  });
});
