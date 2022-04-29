const rateLimit = require('express-rate-limit')
const { HTTP_STATUS_CODE } = require('../libs/constants')

const limiter = (duration, limit) => {
  return rateLimit({
    windowMs: (duration * 60 * 1000),
    max: limit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
      res.status(HTTP_STATUS_CODE.TOO_MANY_REQUESTS).json({
        status: 'error',
        code: HTTP_STATUS_CODE.TOO_MANY_REQUESTS,
        message: 'Too many requests',
      })
    },
  })
}

module.exports = limiter