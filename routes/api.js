'use strict';
const { Thread } = require('../models/thread');
const { Reply } = require('../models/reply');

module.exports = app => {
  app
    .route('/api/threads/:board')
    .post((req, res) => {
      let thread = req.body;
      thread.board = req.params.board;
      const doc = new Thread(thread);
      doc.save();
      res.send(doc);
    })

    .get((req, res) => {
      board = req.params.board;
      const threadList = Thread.find({ board })
        .sort({ bumped_on: -1 })
        .limit(10);
      const replyList = Reply.find({ board });
    });

  app.route('/api/replies/:board');
};
