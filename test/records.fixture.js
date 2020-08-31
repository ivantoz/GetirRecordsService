const mongoose = require('mongoose');
const Records = require('../src/api/records/model');

const recordOne = {
  _id: mongoose.Types.ObjectId(),
  key: 'TAKwGc6Jr4i8Z487',
  createdAt: '2017-01-28T01:22:14.398Z',
  counts: [150,160],
  value: 'Getir Task'
}

const recordTwo = {
  _id: mongoose.Types.ObjectId(),
  key: 'TAKwGc6Jr4i8Z487',
  createdAt: '2017-01-28T01:22:14.398Z',
  counts: [170],
  "value": 'Getir Task'
}


const recordThree = {
  _id: mongoose.Types.ObjectId(),
  key: 'BqOIkrTF',
  createdAt: new Date("2017-01-28"),
  counts: [1401,1950,1283],
  value: 'vHpHAzrmkwtt'
}


const recordFour = {
  _id: mongoose.Types.ObjectId(),
  key: 'eNLQUusk',
  value: 'CQAWaskyijQk',
  createdAt: '2016-11-20T08:07:41.749Z',
  counts: [142,678,392]
}

module.exports = {
  recordOne,
  recordTwo,
  recordThree,
  recordFour,
};
