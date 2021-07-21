const Router = require('express')
const swimsuitController = require('../controllers/swimsuitController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.post('/', authMiddleware('ADMIN'), swimsuitController.create)
router.get('/', swimsuitController.get)
router.get('/:id', swimsuitController.getOne)
router.patch('/:id', authMiddleware('ADMIN'), swimsuitController.update)
router.delete('/:id', authMiddleware('ADMIN'), swimsuitController.delete)

module.exports = router
