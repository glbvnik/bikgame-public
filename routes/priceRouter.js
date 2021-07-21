const Router = require('express')
const shippingController = require('../controllers/priceController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.get('/', shippingController.get)
router.patch('/:id', authMiddleware('ADMIN'), shippingController.update)

module.exports = router
