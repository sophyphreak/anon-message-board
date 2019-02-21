const moment = require('moment');
const delete_password = 'iamthepassword';

const getReplyFixtures = () => [
  {
    text: 'reply fixture 1',
    delete_password,
    created_on: moment('2019-2-1')
  },
  {
    text: 'reply fixture 2',
    delete_password,
    created_on: moment('2019-1-1')
  },
  {
    text: 'reply fixture 3',
    delete_password,
    created_on: moment('2019-2-2')
  },
  {
    text: 'reply fixture 4',
    delete_password,
    created_on: moment('2019-1-2')
  },
  {
    text: 'reply fixture 5',
    delete_password,
    created_on: moment('2019-2-3')
  },
  {
    text: 'reply fixture 6',
    delete_password,
    created_on: moment('2019-1-10')
  }
];

module.exports = { getReplyFixtures };
