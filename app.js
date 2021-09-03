const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index')

const app = express()
app.use(cors())
require('./database')
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', indexRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, e => {
  if (e) throw new Error(e)

  console.log('Servidor en puerto ', port)
})
