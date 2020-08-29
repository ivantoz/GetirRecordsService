import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Records } from '.'

const app = () => express(apiRoot, routes)

/* eslint-disable-next-line no-unused-vars */
let records

beforeEach(async () => {
  records = await Records.create({})
})

test('POST /records 200', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({
      startDate: '2016-01-26',
      endDate: '2018-02-20',
      minCount: 2700,
      maxCount: 3000
    })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.key).toEqual('test')
  expect(body.value).toEqual('test')
  expect(body.counts).toEqual('test')
  expect(body.createdAt).toEqual('test')
})
