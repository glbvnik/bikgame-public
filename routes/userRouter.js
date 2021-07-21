const Router = require('express')
const { check } = require('express-validator')
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.post('/signup',[
    check('email', "Email must be valid and can't be empty").isEmail(),
    check('password', "Password can't be shorter than 8 characters").isLength({ min: 8 }),
    check('firstName', "First name can't be empty").notEmpty(),
    check('lastName', "Last name can't be empty").notEmpty()
], userController.signUp)
router.get('/verify/:id', userController.verify)
router.post('/signin', userController.signIn)
router.get('/check', userController.check)
router.get('/clear', userController.clear)
router.get('/get', authMiddleware(), userController.getData)
router.patch('/reset', userController.updateReset)
router.patch('/reset/:id', check('password', "Password can't be shorter than 8 characters").isLength({ min: 8 }), userController.resetPassword)

module.exports = router
