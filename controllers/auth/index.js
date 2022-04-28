const AuthService = require('../../services/auth')
const { HTTP_STATUS_CODE } = require('../../libs/constants')

const registration = async (req, res) => {
  const user = await AuthService.create(req.body)
  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: 'success',
    code: HTTP_STATUS_CODE.CREATED,
    data: { ...user },
  })
}

const login = async (req, res) => {
  const token = await AuthService.login(req.body)
  return res.status(HTTP_STATUS_CODE.OK).json({ status: 'success', code: HTTP_STATUS_CODE.OK, data: { token } })
}

const logout = async (req, res) => {
  await AuthService.logout(req.user.id)
  return res.status(HTTP_STATUS_CODE.NO_CONTENT).json()
}

module.exports = { registration, login, logout }