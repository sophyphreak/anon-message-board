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
const moment = require('moment');

const server = require('../server');
const { Thread } = require('../models/thread');
const { Reply } = require('../models/reply');

chai.use(chaiHttp);

const password = 'iamthepassword';

suite('Functional Tests', () => {
  suite('API ROUTING FOR /api/threads/:board', () => {
    before(() => {
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
      test('gets a list of all threads', done => {
        chai.request(server);
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
