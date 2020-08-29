export const success = (res, status) => (records) => {
  if (records.length) {
    const resp = { code: 0, msg: 'Success', records }
    res.status(status || 200).json(resp)
  } else {
    res.status(400).json({ code: 400, msg: 'Bad request' })
  }
  return null
}
