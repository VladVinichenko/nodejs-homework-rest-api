const Contacts = require('../../repository/contacts')

const { HTTP_STATUS_CODE } = require('../../libs/constants')
const { CustomError } = require('../../middlewares/error-handler')

class ContactService {
  async getAll(query, user) {

    const { limit = 5, skip = 0, sortBy, sortByDesc, filter } = query
    let sortCriteria = null
    let select = null
    if (sortBy) {
      sortCriteria = { [sortBy]: 1 }
    }
    if (sortByDesc) {
      sortCriteria = { [sortByDesc]: -1 }
    }
    // name|phone|email|favorite => 'name phone email favorite'
    if (filter) {
      select = filter.split('|').join(' ')
    }

    const { total, results: contacts } = await Contacts.listContacts({ limit, skip, sortCriteria, select }, user)
    return { total, contacts }

  }

  async getById(id, user) {
    const contact = await Contacts.getContactById(id, user)
    if (!contact) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not found')
    }
    return contact
  }

  async create(body, user) {
    const contact = await Contacts.addContact(body, user)
    return contact
  }

  async update(id, body, user) {
    const contact = await Contacts.updateContact(id, body, user)
    if (!contact) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not found')
    }
    return contact
  }

  async remove(id, user) {
    const contact = await Contacts.removeContact(id, user)
    if (!contact) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'Not found')
    }
    return contact
  }

}

module.exports = new ContactService()