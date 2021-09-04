const { User } = require('../database')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

let validations = [
  check('email')
    .isEmail()
    .withMessage('The email you have entered is not valid')
    .contains('@')
    .withMessage('The email you have entered does not contain an @'),

  check('password')
    .isLength({ min: 5 })
    .withMessage('The password must have at least 5 characters')
]

const postRegister = async (req, res) => {
  let { name, email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if (user) {
    res.json({ message: 'User already register' })
  } else {
    const hash = await bcrypt.hash(password, 10)
    password = hash
    try {
      const register = await User.create({ name, email, password })
      const token = jwt.sign(
        {
          email: register.dataValues.email,
          userId: register.dataValues.id
        },
        'secret',
        (err, token) => {
          if (err) throw err
          res.json({ message: 'ok', name, token })
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
}

const postLogin = async (req, res) => {
  const { email, password } = req.body
  const hash = await bcrypt.hash(password, 10)
  const user = await User.findOne({ where: { email } })
  if (user) {
    const validPass = await bcrypt.compare(password, user.password)
    console.log(validPass)
    if (validPass) {
      const token = jwt.sign(
        {
          email,
          userId: user.id
        },
        'secret',
        (err, token) => {
          res.json({
            message: 'ok',
            name: user.name,
            token
          })
        }
      )
    } else {
      res.json({ message: 'Wrong password' })
    }
  } else {
    res.json({ message: 'Email not registered' })
  }
}

const postLogout = (req, res, next) => {
  res.json({})
}

module.exports = {
  postRegister,
  postLogin,
  postLogout
}
