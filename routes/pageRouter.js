const Router = require('express')
const pageController = require('../controllers/pageController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.get('/:id', pageController.getOne)
router.patch('/:id', authMiddleware('ADMIN'), pageController.update)

module.exports = router
