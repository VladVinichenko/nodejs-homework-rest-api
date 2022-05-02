const { HTTP_STATUS_CODE } = require('../../libs/constants')
const AvatarService = require('../../services/avatars/service')
const LocalStorage = require('../../services/avatars/local-storage')

const avatar = async (req, res, next) => {
  const avatarService = new AvatarService(LocalStorage, req.file, req.user)
  const urlOfAvatar = await avatarService.update()
  res.json({
    status: 'success', code: HTTP_STATUS_CODE.OK, payload: { avatar: urlOfAvatar }
  })
}


module.exports = { avatar }