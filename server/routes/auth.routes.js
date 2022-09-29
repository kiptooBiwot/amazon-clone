const { authControllers } = require('../controllers/auth.controller')
const auth = require('../middlewares/auth.middleware')

const router = require('express').Router()

router.post('/signup', authControllers.registerUser)

router.post('/signin', authControllers.signInUser)

router.post('/tokenIsValid', authControllers.tokenIsValid)

router.get('/', auth, authControllers.getVerifiedUser)

module.exports = router