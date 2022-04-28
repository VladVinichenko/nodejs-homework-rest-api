const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { Subscription } = require('../libs/constants')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: { type: String, default: 'Guest' },
  email: {
    type: String,
    required: [true, 'Set email for user'],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/
      return re.test(String(value).toLowerCase())
    },
  },
  password: { type: String, required: true },
  subscription: { type: String, enum: { values: Object.values(Subscription), message: 'Invalid subscription' }, default: Subscription.STARTER },
  token: { type: String, default: null },
}, { versionKey: false, timestamps: true, toObject: { virtuals: true }, },



)



userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(6)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User