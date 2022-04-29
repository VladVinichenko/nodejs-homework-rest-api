const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const limiter = ('./middlewares/rate-limit.js')

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(limiter(15, 100))
app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))
app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
