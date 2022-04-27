const express = require('express')
const contactRepository = require('../../repository/contacts')
const { HTTP_STATUS_CODE } = require('../../libs/constants.js')
const { HTTP_STATUS } = require('../../libs/messages')

const listContacts = async (req, res, next) => {
  const contacts = await contactRepository.listContacts()
  return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contacts } })
}

const getContact = async (req, res, next) => {
  const contact = await contactRepository.getContactById(req.params.contactId)
  console.log(contact);
  if (contact) {
    return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contact } })
  }
  return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: HTTP_STATUS.NOT_FOUND })
}

const addContact = async (req, res, next) => {
  const contact = await contactRepository.addContact(req.body)
  return res.status(HTTP_STATUS_CODE.CREATED).json({ status: 'success', code: HTTP_STATUS_CODE.CREATED, payload: { contact } })
}

const deleteContact = async (req, res, next) => {
  const contact = await contactRepository.removeContact(req.params.contactId)
  if (contact) {
    return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contact } })
  }
  return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: HTTP_STATUS.NOT_FOUND })
}

const updateContact = async (req, res, next) => {
  const contact = await contactRepository.updateContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contact } })
  }
  return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: HTTP_STATUS.NOT_FOUND })

}

module.exports = { listContacts, getContact, addContact, deleteContact, updateContact }
