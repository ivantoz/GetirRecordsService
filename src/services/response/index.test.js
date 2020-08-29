import * as response from '.'

let res

beforeEach(() => {
  res = {
    status: jest.fn(() => res),
    json: jest.fn(() => res),
    end: jest.fn(() => res)
  }
})

describe('success', () => {
  it('responds with passed object and status 200', () => {
    expect(response.success(res)(['record_object'])).toBeNull()
    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith({ code: 0, msg: 'Success', records: ['record_object'] })
  })

  it('responds with passed object and status 400', () => {
    expect(response.success(res)([])).toBeNull()
    expect(res.status).toBeCalledWith(400)
    expect(res.json).toBeCalledWith({ code: 400, msg: 'Bad request' })
  })
})
