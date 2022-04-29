const express = require('express')
const { schemaCreateContact, schemaBody, schemaFavorites } = require('./contacts-validation-schemes')
const { validateBody } = require('../../../middlewares/validation')
const router = express.Router()
const { listContacts, getContact, addContact, deleteContact, updateContact } = require('../../../controllers/contacts')
const guard = require('../../../middlewares/guard')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')

router.get('/', guard, wrapperError(listContacts))

router.get('/:contactId', guard, wrapperError(getContact))

router.post('/', guard, validateBody(schemaCreateContact), wrapperError(addContact))

router.delete('/:contactId', guard, wrapperError(deleteContact))

router.put('/:contactId', guard, validateBody(schemaBody), wrapperError(updateContact))

router.patch('/:contactId/favorites', guard, validateBody(schemaFavorites), wrapperError(updateContact))


module.exports = router
