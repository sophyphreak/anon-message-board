/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const { Thread } = require('../models/thread');
const { Reply } = require('../models/reply');

module.exports = app => {
  app.route('/api/threads/:board').post((req, res) => {
    let thread = req.body;
    thread.board = req.params.board;
    const doc = new Thread(thread);
    doc.save();
    res.send(doc);
  });

  app.route('/api/replies/:board');
};
