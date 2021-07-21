const Router = require('express')
const userRouter = require('./userRouter')
const swimsuitRouter = require('./swimsuitRouter')
const collectionRouter = require('./collectionRouter')
const setRouter = require('./setRouter')
const typeRouter = require('./typeRouter')
const imageRouter = require('./imageRouter')
const orderRouter = require('./orderRouter')
const priceRouter = require('./priceRouter')
const pageRouter = require('./pageRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/swimsuit', swimsuitRouter)
router.use('/collection', collectionRouter)
router.use('/set', setRouter)
router.use('/type', typeRouter)
router.use('/image', imageRouter)
router.use('/order', orderRouter)
router.use('/price', priceRouter)
router.use('/page', pageRouter)

module.exports = router
