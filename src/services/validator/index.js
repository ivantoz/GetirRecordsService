const isString = (value) => {
  return !!value && (typeof value === 'string' || value instanceof String)
}

const dateValidator = (value, param) => ({
  valid:
  !!value &&
  isString(value) &&
  /\d{4}-\d{2}-\d{2}/.test(value) &&
  !isNaN(new Date(value)),
  message: param.name + ' must be in "YYYY-MM-DD" format'
})

const numberValidator = (value, param) => ({
  valid:
  /^[0-9]\d*$/.test(value),
  message: param.name + ' must be positive number'
})

const validateRecordRequestParams = (req) => {
  if (new Date(req.body.startDate) > new Date(req.body.endDate)) {
    return 'startDate should not be older than endDate'
  }
  const minimumCount = Number(req.body.minCount)
  const maximumCount = Number(req.body.maxCount)

  if (minimumCount > maximumCount) {
    return 'minCount should not be greater than maxCount'
  }
  return null
}

module.exports = {
  dateValidator,
  numberValidator,
  validateRecordRequestParams
}
