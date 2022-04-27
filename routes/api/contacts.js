const express = require('express')
const contactRepository = require('../../repository/contacts')
const { schemaCreateContact, schemaBody, schemaFavorites } = require('./contacts-validation-schemes')
const { validateBody } = require('../../middlewares/validation')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactRepository.listContacts()
  return res.json({ status: 'success', code: '200', payload: { contacts } })
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactRepository.getContactById(req.params.contactId)
  console.log(contact);
  if (contact) {
    return res.json({ status: 'success', code: '200', payload: { contact } })
  }
  return res.status(404).json({ status: 'error', code: '404', message: 'Not found' })
})

router.post('/', validateBody(schemaCreateContact), async (req, res, next) => {
  const contact = await contactRepository.addContact(req.body)
  return res.status(201).json({ status: 'success', code: '201', payload: { contact } })
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contactRepository.removeContact(req.params.contactId)
  if (contact) {
    return res.json({ status: 'success', code: '200', payload: { contact } })
  }
  return res.status(404).json({ status: 'error', code: '404', message: 'Not found' })
})

router.put('/:contactId', validateBody(schemaBody), async (req, res, next) => {
  const contact = await contactRepository.updateContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'success', code: '200', payload: { contact } })
  }
  return res.status(404).json({ status: 'error', code: '404', message: 'Not found' })

})

router.patch('/:contactId/favorites', validateBody(schemaFavorites), async (req, res, next) => {
  const contact = await contactRepository.updateContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'success', code: '200', payload: { contact } })
  }
  return res.status(404).json({ status: 'error', code: '404', message: 'Not found' })

})


module.exports = router
