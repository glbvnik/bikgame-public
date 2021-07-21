const { Page } = require('../models')
const ApiError = require('../errors/apiError')

class PageController {
    async getOne(req, res, next) {
        try {
            const { id } = req.params

            const page = await Page.findOne({ where: { name: id } })

            return res.json(page)
        } catch (e) { return next(ApiError.badRequest('Bad request')) }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params

            const { text } = req.body

            const page = await Page.update({ text }, { returning: true, where: { name: id } })

            if (page[0] === 0) return next(ApiError.notFound("Can't update unexisting page"))

            return res.json(page)
        } catch (e) { return next(ApiError.internal(e.message)) }
    }
}

module.exports = new PageController()
