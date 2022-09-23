const User = require('../models/user.model')

module.exports.authControllers = {
  registerUser: async (req, res, next) => {

    // Get data from client
    const { name, email, password } = req.body

    // Check if the new user email already exists in the db
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'A user with the same email already exists!' })
    }
    // Post data to the database
    // return a response to the client
    res.json('User registered')
  }
}