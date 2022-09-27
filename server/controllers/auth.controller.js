const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.authControllers = {
  /**
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  registerUser: async (req, res, next) => {

    try {
      // Get data from client
      const { name, email, password } = req.body

      // Check if the new user email already exists in the db
      const existingUser = await User.findOne({ email })

      if (existingUser) {
        return res.status(400).json({ message: 'A user with the same email already exists!' })
      }

      // Encrypt the password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Post data to the database
      let user = new User({
        name,
        email,
        password: hashedPassword
      })
      user = await user.save()
      // return a response to the client
      res.json(user)

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  /**
   * LOGIN Endpoint
   */
  signInUser: async (req, res, next) => {
    try {
      // get the login credentials
      const { email, password } = req.body

      console.log(req.body)

      // find user with the email in the database
      const userExists = await User.findOne({ email })

      console.log(userExists)

      if (!userExists) {
        return res.status(400).json({ msg: 'You are not registered. You may want to register to access the app.' })
      }

      // compare passwords
      const isMatch = await bcrypt.compare(password, userExists.password)

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid email and/or password. Try again.' })
      }
      // Sign the payload into a jwt token

      const token = jwt.sign({ id: userExists._id }, "ranomStringOfWords")

      res.json({ token, ...userExists._doc })
      // Send the user with the token to the frontend  
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}