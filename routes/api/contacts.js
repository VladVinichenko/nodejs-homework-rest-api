const express = require('express')
const contactModel = require('../../models/contacts')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = contactModel.listContacts()
  res.json({ status: 'success', code: '200', payload: { contacts } })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
