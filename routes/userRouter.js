const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post(url+ '/donorRegister', userCtrl.donorRegister)
router.post(url+ '/doneeRegister', userCtrl.doneeRegister)

router.post(url+ '/login', userCtrl.login)

router.get(url+ '/logout', userCtrl.logout)

router.get(url+ '/refresh_token', userCtrl.refreshToken)

router.get(url+ '/infor', auth,  userCtrl.getUser)

router.patch(url+ '/addcart', auth, userCtrl.addCart)

router.get(url+ '/dashboard', auth, userCtrl.dashboard)


module.exports = router