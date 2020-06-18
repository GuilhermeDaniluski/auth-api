const validator = require('../helpers/validate')

const credentials = (req, res, next) => {
  const validationRule = {
    credentials: {
      username: 'required',
      password: 'required'
    },
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      })
    } else {
      next()
    }
  })
}


const ip = (req, res, next) => {
  const validationRule = {
      ip:'required'
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      })
    } else {
      next()
    }
  })
}

module.exports = {
  credentials,
  ip
}
