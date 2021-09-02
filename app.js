const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index')

const app = express()
require('./database')
app.use(express.static(path.join(__dirname, 'client/build')));


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', indexRouter)

app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(process.env.PORT, e => {
  if (e) throw new Error(e)

  console.log('Servidor en puerto ', process.env.PORT)
})
