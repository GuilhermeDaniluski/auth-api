const jwt = require('jsonwebtoken')
const User = require('../models/User')
const constants = require('../config/constants')

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token
    const data = jwt.verify(token, constants.auth.jwtKey)
    if (!token) {
      throw new Error()
    }
    const user = await User.findOne({ _id: data._id})
    if (!user) {
      throw new Error()
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}
module.exports = auth
