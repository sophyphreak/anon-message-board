const moment = require('moment');
const delete_password = 'iamthepassword';

const getThreadFixtures = () => [
  {
    text: 'thread fixtures 1',
    delete_password,
    bumped_on: moment('1995-1-1'),
    created_on: moment('1995-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 2',
    delete_password,
    bumped_on: moment('1990-1-1'),
    created_on: moment('1990-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 3',
    delete_password,
    bumped_on: moment('1998-1-1'),
    created_on: moment('1998-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 4',
    delete_password,
    bumped_on: moment('1988-1-1'),
    created_on: moment('1988-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 5',
    delete_password,
    bumped_on: moment('2011-1-1'),
    created_on: moment('2011-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 6',
    delete_password,
    bumped_on: moment('2015-1-1'),
    created_on: moment('2015-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 7',
    delete_password,
    bumped_on: moment('1994-1-1'),
    created_on: moment('1994-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 8',
    delete_password,
    bumped_on: moment('2007-1-1'),
    created_on: moment('2007-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 9',
    delete_password,
    bumped_on: moment('2013-1-1'),
    created_on: moment('2013-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 10',
    delete_password,
    bumped_on: moment('2017-1-1'),
    created_on: moment('2017-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 11',
    delete_password,
    bumped_on: moment('2018-1-1'),
    created_on: moment('2018-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 12',
    delete_password,
    bumped_on: moment('1991-1-1'),
    created_on: moment('1991-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 13',
    delete_password,
    bumped_on: moment('1992-1-1'),
    created_on: moment('1992-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 14',
    delete_password,
    bumped_on: moment('1997-1-1'),
    created_on: moment('1997-1-1'),
    board: 'test'
  },
  {
    text: 'thread fixtures 15',
    delete_password,
    bumped_on: moment('2000-1-1'),
    created_on: moment('2000-1-1'),
    board: 'test'
  }
];

module.exports = { getThreadFixtures };
