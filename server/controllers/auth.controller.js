const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

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
  }
}