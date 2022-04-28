const express = require('express')
const { schemaCreateContact, schemaBody, schemaFavorites } = require('./contacts-validation-schemes')
const { validateBody } = require('../../../middlewares/validation')
const router = express.Router()
const { listContacts, getContact, addContact, deleteContact, updateContact } = require('../../../controllers/contacts')
const guard = require('../../../middlewares/guard')

router.get('/', guard, listContacts)

router.get('/:contactId', guard, getContact)

router.post('/', guard, validateBody(schemaCreateContact), addContact)

router.delete('/:contactId', guard, deleteContact)

router.put('/:contactId', guard, validateBody(schemaBody), updateContact)

router.patch('/:contactId/favorites', guard, validateBody(schemaFavorites), updateContact)


module.exports = router
