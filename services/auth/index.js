const jwt = require("jsonwebtoken");
const Users = require("../../repository/users");

const { HTTP_STATUS_CODE } = require("../../libs/constants");
const { CustomError } = require("../../middlewares/error-handler");
const EmailService = require("../email/service");
const SenderNodemailer = require("../email/senders/nodemailer-sender");
const SenderSendGrid = require("../email/senders/sendgrid-sender");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
    const user = await Users.findByEmail(body.email);
    if (user) {
      throw new CustomError(HTTP_STATUS_CODE.CONFLICT, "User already exists");
    }
    const newUser = await Users.create(body);

    const sender = new SenderSendGrid();
    const emailService = new EmailService(sender);
    try {
      await emailService.sendEmail(
        newUser.email,
        newUser.name,
        newUser.verifyEmailToken
      );
    } catch (error) {
      console.log(error);
    }

    return {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatar,
    };
  }

  async login({ email, password }) {
    const user = await this.#getUser(email, password);
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "Invalid credentials"
      );
    }
    const token = this.#generateToken(user);
    await Users.updateToken(user._id, token);
    return token;
  }

  async logout(id) {
    await Users.updateToken(id, null);
  }

  async #getUser(email, password) {
    const user = await Users.findByEmail(email);
    if (!user) {
      return null;
    }
    if (!(await user?.isValidPassword(password))) {
      return null;
    }
    if (!user?.isVerify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Verification has already been passed"
      );
    }
    return user;
  }

  #generateToken(user) {
    const payload = { _id: user._id, email: user.email };
    console.log(SECRET_KEY);
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    return token;
  }

  async verifyUser(token) {
    const user = await Users.findByToken(token);
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Verification has already been passed"
      );
    }

    if (user && user.isVerify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Verification email send"
      );
    }

    await Users.verifyUser(user.id);
    return user;
  }

  async reverifyEmail(email) {
    const user = await Users.findByEmail(email);
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.NOT_FOUND,
        "User with email not found"
      );
    }

    if (user && user.isVerify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Verification email send"
      );
    }

    const sender = new SenderNodemailer();
    const emailService = new EmailService(sender);
    try {
      await emailService.sendEmail(
        user.email,
        user.name,
        user.verifyEmailToken
      );
    } catch (error) {
      console.log(error);
      throw new CustomError(
        HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
        "Error sending email"
      );
    }
  }
}

module.exports = new AuthService();
