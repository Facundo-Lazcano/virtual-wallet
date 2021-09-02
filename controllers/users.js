const { User } = require('../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const session = require('express-session')

const postRegister = async (req, res) => {
  let { name, email, password } = req.body
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
        res.json({ name, token })
      }
    )
  } catch (error) {
    console.log(error)
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
            name: user.name,
            token
          })
        }
      )
    }
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
