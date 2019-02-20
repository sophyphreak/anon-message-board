const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(`mongodb://localhost:27017/anonMessageBoardTest`, {
    useNewUrlParser: true
  });
} else {
  const mongoDB = `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds153637.mlab.com:53637/anon-message-board`;

  mongoose.connect(mongoDB, {
    useNewUrlParser: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = {
  mongoose
};
