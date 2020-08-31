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
  it('responds with success code, message and object', () => {
    expect(response.success(res)({ prop: 'value' })).toBeUndefined()
    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith({ code: 0, msg: 'Success', prop: 'value' })
  })
})
