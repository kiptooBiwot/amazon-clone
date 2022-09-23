const { Schema, model } = require('mongoose')

const userSchema = Schema({
  name: {
    requried: true,
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return value.match(re)
      },
      message: 'Please enter a valid email'
    }
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'user'
  }
  // Cart
})

module.exports = model('User', userSchema)