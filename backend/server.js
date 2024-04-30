require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const radiatorRoutes = require('./routes/radiators')
// express app
const app = express()

// middleware
app.use(express.json())

const cors = require('cors');

const allowedOrigins = [
  "http://localhost:5173", //your frontend URL
  // any other origins you want to allow
]

const corsOptions = {
  origin: allowedOrigins
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/radiators', radiatorRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 