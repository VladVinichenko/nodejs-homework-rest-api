const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ 'any.required': 'missing required name field' }),
  phone: Joi.string().pattern(new RegExp('[0-9]+-')).required()
    .messages({ 'any.required': 'missing required name field' }),
  email: Joi.string()
    .email({ minDomainSegments: 2 }).required().messages({ 'any.required': 'missing required name field' }),
})

const schemaBody = Joi.object({
  name: Joi
    .required()
    .messages({ 'any.required': 'missing field' }),
  phone: Joi.required()
    .messages({ 'any.required': 'missing required name field' }),
  email: Joi.required().messages({ 'any.required': 'missing field' }),
})

module.exports = { schemaCreateContact, schemaBody }
