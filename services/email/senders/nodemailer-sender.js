const nodemailer = require("nodemailer");

class SenderNodemailer {
  constructor() {
    this.config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER,
      },
    };
  }

  async send(msg) {
    const transporter = nodemailer.createTransport(this.config);
    const result = await transporter.sendMail({
      ...msg,
      from: process.env.USER_NODEMAILER,
    });
    return result;
  }
}

module.exports = SenderNodemailer;
