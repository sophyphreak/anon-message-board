const moment = require('moment');
const delete_password = 'iamthepassword';

const getReplyFixtures = () => [
  {
    text: 'reply fixture 1',
    delete_password,
    created_on: moment('2019-02-01')
  },
  {
    text: 'reply fixture 2',
    delete_password,
    created_on: moment('2019-01-01')
  },
  {
    text: 'reply fixture 3',
    delete_password,
    created_on: moment('2019-02-02')
  },
  {
    text: 'reply fixture 4',
    delete_password,
    created_on: moment('2019-01-02')
  },
  {
    text: 'reply fixture 5',
    delete_password,
    created_on: moment('2019-02-03')
  },
  {
    text: 'reply fixture 6',
    delete_password,
    created_on: moment('2019-01-10')
  }
];

module.exports = { getReplyFixtures };
