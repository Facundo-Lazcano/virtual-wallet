const jwt = require('jsonwebtoken')

module.exports = {
  errorHandler: fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  },
  requireAuth: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, 'secret')
      req.userId = decoded.userId
      next()
    } catch (e) {
      return res.status(401).json({
        message: 'Auth failed'
      })
    }
  }
}
