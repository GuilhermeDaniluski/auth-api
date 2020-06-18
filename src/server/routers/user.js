const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const { credentials } = require('../middleware/validator')

const router = express.Router()

router.get('/users',auth, async (req, res) => {
  // Get a list of users
  try {
    User.find({}, function(err, users) {
      let userMap = {};
  
      users.forEach(function(user) {
        userMap[user._id] = user;
      });
  
      res.status(200).send(userMap);
    });
  } catch (error) {
    res.status(403).send(error)
  }
})

router.post('/users', async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.cookie('token', token, { httpOnly: true }).status(201).send({ user })
  } catch (error) {
    res.status(403).send(error)
  }
})

router.post('/users/login', async (req, res) => {
  //Login a registered user
  try {
    const { username, password } = req.body
    const user = await User.findByCredentials(username, password)
    if (!user) {
      return res.status(403).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.cookie('token', token, { httpOnly: true }).sendStatus(200)
  } catch (error) {
    res.status(403).send(error.message)
  }
})

router.get('/users/refreshToken', auth, async (req, res) => {
  // Refresh JWT Token
  const token = await req.user.generateAuthToken()
  res.cookie('token', token, { httpOnly: true,}).sendStatus(200)
})


router.post('/users/me/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/users/me/logoutall', auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/users/me', auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user)
})

router.post('/users/me', [auth, credentials], async (req, res) => {
  // Log user out of all devices
  try {
    const { username, password } = req.body.credentials
    if (username) {
      req.user.username = username
    }
    if (password) {
      req.user.password = password
    }
    await req.user.save()
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
