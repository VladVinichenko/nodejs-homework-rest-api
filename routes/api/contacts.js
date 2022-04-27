const express = require('express')
const { schemaCreateContact, schemaBody, schemaFavorites } = require('../../routes/api/contacts-validation-schemes')
const { validateBody } = require('../../middlewares/validation')
const router = express.Router()
const { listContacts, getContact, addContact, deleteContact, updateContact } = require('../../controllers/contacts')

router.get('/', listContacts)

router.get('/:contactId', getContact)

router.post('/', validateBody(schemaCreateContact), addContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', validateBody(schemaBody), updateContact)

router.patch('/:contactId/favorites', validateBody(schemaFavorites), updateContact)


module.exports = router
