import { Records } from '.'

let records

beforeEach(async () => {
  records = await Records.create({ key: 'test', value: 'test', counts: [150,160], createdAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = records.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(records.id)
    expect(view.key).toBe(records.key)
    expect(view.value).toBe(records.value)
    expect(view.counts).toBe(records.counts)
    expect(view.createdAt).toBe(records.createdAt)
    expect(view.createdAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = records.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(records.id)
    expect(view.key).toBe(records.key)
    expect(view.value).toBe(records.value)
    expect(view.counts).toBe(records.counts)
    expect(view.createdAt).toBe(records.createdAt)
    expect(view.createdAt).toBeTruthy()
  })
})
