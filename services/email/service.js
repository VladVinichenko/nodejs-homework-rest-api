const Mailgen = require("mailgen");

class EmailService {
  constructor(sender) {
    this.sender = sender;
    this.link = "https://4257-185-209-58-133.eu.ngrok.io";
    this.mailgen = new Mailgen({
      theme: "default",
      product: {
        name: "My contacts",
        link: this.link,
      },
    });
  }

  createEmailTemplate(username, token) {
    const email = {
      name: username,
      intro: "Welcome to My Contacts!",
      action: {
        instructions: "To get started with My Contacts, please click here:",
        button: {
          color: "#22BC66",
          text: "Confirm your account",
          link: `${this.link}/api/users/verify/${token}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we`d love to help",
    };
    return this.mailgen.generate(email);
  }

  async sendEmail(email, username, token) {
    const emailTemplate = this.createEmailTemplate(username, token);
    const message = {
      to: email,
      subject: "Welcome to My Contacts!",
      html: emailTemplate,
    };
    const result = await this.sender.send(message);
    return result;
  }
}

module.exports = EmailService;
