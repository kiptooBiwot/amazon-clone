const { authControllers } = require('../controllers/auth.controller')

const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ message: 'Hello from the router side of things!' })
})

router.post('/signup', authControllers.registerUser)

router.post('/signin', authControllers.signInUser)

module.exports = router