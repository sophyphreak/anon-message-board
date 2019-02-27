'use strict';
require('../db/mongoose');
const { Thread } = require('../models/thread');
const { Reply } = require('../models/reply');

module.exports = app => {
  app
    .route('/api/threads/:board')

    .post(async (req, res) => {
      let thread = req.body;
      thread.board = req.params.board;
      const doc = new Thread(thread);
      await doc.save(err => err && console.log(err));
      res.redirect(`/b/${thread.board}`);
    })

    .get(async (req, res) => {
      try {
        const board = req.params.board;
        const threads = await Thread.find(
          { board },
          err => err && console.log(err)
        )
          .sort({ bumped_on: -1 })
          .limit(10);
        const replies = await Reply.find(
          { board },
          err => err && console.log(err)
        )
          .sort({ created_on: -1 })
          .limit(3);
        threads.forEach(thread => {
          thread.reported = undefined;
          thread.delete_password = undefined;
        });
        replies.forEach(reply => {
          reply.reported = undefined;
          reply.delete_password = undefined;
        });
        res.send({ threads, replies });
      } catch (e) {
        console.log(e);
      }
    })

    .delete(async (req, res) => {
      try {
        const board = req.params.board;
        const { thread_id, delete_password } = req.body;
        const thread = await Thread.findById(thread_id);
        if (
          board === thread.board &&
          delete_password == thread.delete_password
        ) {
          await Thread.findByIdAndDelete(thread_id);
          res.send('success');
        } else {
          res.send('incorrect password');
        }
      } catch (e) {
        console.log(e);
      }
    })

    .put(async (req, res) => {
      try {
        const board = req.params.board;
        const { thread_id } = req.body;
        const thread = await Thread.findById(thread_id);
        if (thread.board === board) {
          await Thread.findByIdAndUpdate(thread_id, { reported: true });
          res.send('success');
        } else {
          res.send('failure. board incorrect.');
        }
      } catch (e) {
        console.log(e);
      }
    });

  app
    .route('/api/replies/:board')

    .post(async (req, res) => {
      try {
        const replyData = req.body;
        replyData.board = req.params.board;
        const reply = new Reply(replyData);
        reply.save(err => err && console.log(err));
        const { _id, text, created_on, delete_password, reported } = reply;
        Thread.findByIdAndUpdate(
          replyData.thread_id,
          {
            $push: {
              replies: {
                _id,
                text,
                created_on,
                delete_password,
                reported
              }
            },
            bumped_on: created_on
          },
          err => err && console.log(err)
        );
        res.redirect(`/b/${reply.board}/${reply.thread_id}`);
      } catch (e) {
        console.log(e);
      }
    })

    .get(async (req, res) => {
      try {
        const thread_id = req.query.thread_id;
        const replies = await Reply.find({ thread_id }).sort({
          created_on: -1
        });
        replies.forEach(reply => {
          reply.reported = undefined;
          reply.delete_password = undefined;
        });
        const thread = await Thread.findById(thread_id);
        thread.reported = undefined;
        thread.delete_password = undefined;
        res.send({ thread, replies });
      } catch (e) {
        console.log(e);
      }
    })

    .delete(async (req, res) => {})

    .put(async (req, res) => {});
};
