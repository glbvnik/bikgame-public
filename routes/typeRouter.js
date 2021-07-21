const Router = require('express')
const typeController = require('../controllers/typeController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.post('/', authMiddleware('ADMIN'), typeController.create)
router.get('/', typeController.get)
router.patch('/:id', authMiddleware('ADMIN'), typeController.update)
router.delete('/:id', authMiddleware('ADMIN'), typeController.delete)

module.exports = router
