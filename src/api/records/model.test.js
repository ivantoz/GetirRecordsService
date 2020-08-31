import { Records } from '.'
import { recordOne } from '../../../test/records.fixture'

let records

beforeEach(async () => {
  records = await Records.create(recordOne)
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
