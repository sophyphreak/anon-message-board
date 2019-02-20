const getPort = () => {
  if (process.env.PORT) {
    return process.env.PORT;
  }
  switch (true) {
    case process.env.PORT:
      return process.env.PORT;
    case process.env.NODE_ENV === 'test':
      return 3001;
    default:
      return 3000;
  }
};

module.exports = { getPort };
