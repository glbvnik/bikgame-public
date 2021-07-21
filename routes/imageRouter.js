const Router = require('express')
const imageController = require('../controllers/imageController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.post('/', authMiddleware('ADMIN'), imageController.create)
router.get('/', imageController.get)
router.patch('/:id', authMiddleware('ADMIN'), imageController.update)
router.delete('/:id', authMiddleware('ADMIN'), imageController.delete)

module.exports = router
