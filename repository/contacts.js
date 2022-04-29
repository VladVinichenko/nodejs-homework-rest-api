const Contact = require('../models/contact')


const listContacts = async ({ limit, skip, sortCriteria, select }, user) => {
  const total = await Contact.countDocuments({ owner: user._id })
  const results = await Contact.find({ owner: user._id })
    .select(select).skip(skip).limit(limit).sort(sortCriteria)
  return { total, results }
}

const getContactById = async (contactId, user) => {
  const result = await Contact.findOne({ _id: contactId, owner: user._id }).populate({
    path: 'owner',
    select: 'name email subscription createdAt updatedAt'
  })
  return result
}

const removeContact = async (contactId, user) => {
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: user._id })
  return result
}

const addContact = async (body, user) => {
  const result = await Contact.create({ ...body, owner: user._id })
  return result
}

const updateContact = async (contactId, body, user) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: user._id },
    { ...body },
    { new: true },
  )
  return result
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
