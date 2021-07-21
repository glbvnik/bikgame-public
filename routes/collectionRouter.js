const Router = require('express')
const collectionController = require('../controllers/collectionController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.post('/', authMiddleware('ADMIN'), collectionController.create)
router.get('/', collectionController.get)
router.patch('/:id', authMiddleware('ADMIN'), collectionController.update)
router.delete('/:id', authMiddleware('ADMIN'), collectionController.delete)

module.exports = router
