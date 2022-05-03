const sgMail = require('@sendgrid/mail')

class SenderSendGrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const result = await sgMail.send({ ...msg, from: process.env.SENDRID_FROM })
    return result
  }
}

module.exports = SenderSendGrid