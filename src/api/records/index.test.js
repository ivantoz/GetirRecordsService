import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Records } from '.'
import { recordThree } from '../../../test/records.fixture'

const app = () => express(apiRoot, routes)

describe('Records Endpoint', () => {
  test('POST /records 200 empty records', async () => {
    const { status, body } = await request(app()).post(`${apiRoot}`)
      .send({
        startDate: '2015-01-26',
        endDate: '2018-02-20',
        minCount: 2700,
        maxCount: 3000
      })
    expect(status).toBe(200)
    expect(typeof body).toEqual('object')
    expect(body.code).toBe(0)
    expect(body.msg).toBe('Success')
    expect(body.records.length).toBe(0)
  })

  test('POST /records should respond with code 400 when counts in request body are not valid numbers', async () => {
    const { status, body } = await request(app()).post(`${apiRoot}`)
      .send({
        startDate: '2015-01-26',
        endDate: '2018-02-20',
        minCount: -1,
        maxCount: 100
      })
    expect(status).toBe(400)
    expect(typeof body).toEqual('object')
    expect(body.name).toBe('validate')
    expect(body.param).toBe('minCount')
    expect(body.valid).toBe(false)
    expect(body.message).toBe('minCount must be positive number')
  })

  test('POST /records should respond with code 400 when startDate not in YYYY-MM-DD format', async () => {
    const { status, body } = await request(app()).post(`${apiRoot}`)
      .send({
        startDate: '2015/01/26',
        endDate: '2018-02-20',
        minCount: -1,
        maxCount: 100
      })
    expect(status).toBe(400)
    expect(typeof body).toEqual('object')
    expect(body.name).toBe('validate')
    expect(body.param).toBe('startDate')
    expect(body.valid).toBe(false)
    expect(body.message).toBe('startDate must be in \"YYYY-MM-DD\" format') // eslint-disable-line no-useless-escape
  })

  test('POST /records should respond with code 400 when endDate not in YYYY-MM-DD format', async () => {
    const { status, body } = await request(app()).post(`${apiRoot}`)
      .send({
        startDate: '2015-01-26',
        endDate: '2018/02/20',
        minCount: -1,
        maxCount: 100
      })
    expect(status).toBe(400)
    expect(typeof body).toEqual('object')
    expect(body.name).toBe('validate')
    expect(body.param).toBe('endDate')
    expect(body.valid).toBe(false)
    expect(body.message).toBe('endDate must be in \"YYYY-MM-DD\" format') // eslint-disable-line no-useless-escape
  })

  test('POST /records should respond with 400 when startDate is older than endDate', async () => {
    const { status, body } = await request(app()).post(`${apiRoot}`)
      .send({
        startDate: '2018-01-26',
        endDate: '2015-02-20',
        minCount: 50,
        maxCount: 100
      })
    expect(status).toBe(400)
    expect(typeof body).toEqual('object')
    expect(body.code).toBe(-1)
    expect(body.msg).toBe('startDate should not be older than endDate')
  })

  test('POST /records should respond with 400 when minCount is greater than maxCount', async () => {
    const { status, body } = await request(app()).post(`${apiRoot}`)
      .send({
        startDate: '2015-01-26',
        endDate: '2018-02-20',
        minCount: 150,
        maxCount: 100
      })
    expect(status).toBe(400)
    expect(typeof body).toEqual('object')
    expect(body.code).toBe(-1)
    expect(body.msg).toBe('minCount should not be greater than maxCount')
  })

  test('POST /records 200', async () => {
    await Records.create(recordThree)
    const { status, body } = await request(app()).post(`${apiRoot}`)
      .send({
        startDate: '2015-06-02',
        endDate: '2018-01-28',
        minCount: 1300,
        maxCount: 2000
      })
    expect(status).toBe(200)
    expect(typeof body).toEqual('object')
    expect(body.code).toEqual(0)
    expect(body.msg).toEqual('Success')
    // expect(body.records[0].totalCount).toEqual(2892)
    // expect(body.records[0].createdAt).toEqual(recordThree.createdAt)
  })
})
