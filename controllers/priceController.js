const { Price } = require('../models')
const ApiError = require('../errors/apiError')

class PriceController {
    async get(req, res, next) {
        try {
            const prices = await Price.findAll()

            return res.json(prices)
        } catch (e) { return next(ApiError.badRequest('Bad request')) }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id

            const { price } = req.body

            const newPrice = await Price.update({ price }, { returning: true, where: { id } })

            if (price[0] === 0) return next(ApiError.notFound("Can't update unexisting price"))

            return res.json(newPrice)
        } catch (e) { return next(ApiError.internal(e.message)) }
    }
}

module.exports = new PriceController()
