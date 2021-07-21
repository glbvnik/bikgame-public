const Router = require('express')
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.post('/', orderController.create)
router.get('/', authMiddleware(), orderController.get)

module.exports = router
