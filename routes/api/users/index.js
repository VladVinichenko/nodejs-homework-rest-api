const express = require("express");
const { avatar } = require("../../../controllers/users");
const { verifyUser, reverifyEmail } = require("../../../controllers/auth");
const { wrapper: wrapperError } = require("../../../middlewares/error-handler");
const router = express.Router();
const guard = require("../../../middlewares/guard");
const upload = require("../../../middlewares/upload");

router.patch("/avatars", guard, upload.single("avatar"), wrapperError(avatar));

router.get("/verify/:verificationToken", wrapperError(verifyUser));
router.post("/verify", wrapperError(reverifyEmail));

module.exports = router;
