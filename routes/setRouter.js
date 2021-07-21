const Router = require('express')
const setController = require('../controllers/setController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.post('/', authMiddleware('ADMIN'), setController.create)
router.get('/', setController.get)
router.patch('/:id', authMiddleware('ADMIN'), setController.update)
router.delete('/:id', authMiddleware('ADMIN'), setController.delete)

module.exports = router
