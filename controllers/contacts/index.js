const express = require('express')
const contactRepository = require('../../repository/contacts')
const { HTTP_STATUS_CODE } = require('../../libs/constants.js')
const { HTTP_STATUS } = require('../../libs/messages')
const ContactService = require('../../services/contacts')

const listContacts = async (req, res) => {
  const contacts = await ContactService.getAll(req.query, req.user)
  return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { ...contacts } })
}

const getContact = async (req, res) => {
  const contact = await ContactService.getById(req.params.contactId, req.user)
  return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contact } })
}

const addContact = async (req, res) => {
  const contact = await ContactService.create(req.body, req.user)
  return res.status(HTTP_STATUS_CODE.CREATED).json({ status: 'success', code: HTTP_STATUS_CODE.CREATED, payload: { contact } })
}

const deleteContact = async (req, res) => {
  const contact = await ContactService.remove(req.params.contactId, req.user)
  return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contact } })
}

const updateContact = async (req, res) => {
  const contact = await ContactService.update(req.params.contactId, req.body, req.user)
  return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contact } })
}

module.exports = { listContacts, getContact, addContact, deleteContact, updateContact }
