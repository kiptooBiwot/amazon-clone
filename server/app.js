const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()


// routes
const authRoutes = require('./routes/auth.routes')

const PORT = process.env.PORT || 3000

// Connection to the database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection successful')
  })
  .catch((e) => {
    console.log(`Error: ${e}`)
  })

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(cors())

app.use('/api/v1/auth/', authRoutes)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}...`)
})