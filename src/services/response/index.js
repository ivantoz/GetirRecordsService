const response = (res, status, code, msg, otherFields) => {
  const output = { code, msg, ...otherFields }
  res.status(status).json(output)
}

const success = (res) => (record) => {
  response(res, 200, 0, 'Success', record)
}

module.exports = {
  success,
  response
}
