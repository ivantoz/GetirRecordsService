import supertest from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes from '.'
import { recordThree, insertRecords } from '../../../test/records.fixture'

const app = () => express(apiRoot, routes)

const request = supertest(app)

/* eslint-disable-next-line no-unused-vars */
// let records

// beforeEach(async () => {
//   records = await Records.create(recordThree)
// })

test('POST /records 200', async () => {
  // const recordsModel = new Records(recordThree)
  // const ret = await recordsModel.save()
  // console.log(ret)
  await insertRecords([recordThree])
  const { status, body } = await request.post('/records')
    .send({
      startDate: '2015-01-26',
      endDate: '2018-01-28',
      minCount: 1400,
      maxCount: 2000
    })
  console.log('status ===>', status)
  console.log('body ==>', body)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.code).toEqual(0)
  expect(body.msg).toEqual('Success')
  expect(body.records[0].key).toEqual('test')
  expect(body.records[0].totalCount).toEqual(2892)
  expect(body.records[0].createdAt).toEqual(recordThree.createdAt)
})
