const { Collection } = require('../models')
const { Set } = require('../models')
const ApiError = require('../errors/apiError')

class CollectionController {
    async create(req, res, next) {
        try {
            const { name } = req.body

            if (!name) return next(ApiError.badRequest("Can't create unnamed collection"))

            const collection = await Collection.create({ name })

            return res.json(collection)
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async get(req, res, next) {
        try {
            const { id } = req.query || {}

            if (id) {
                const collection = await Collection.findOne({ where: { id } })

                return res.json(collection)
            }

            const collections = await Collection.findAll({ include: [{ model: Set, as: 'sets' }], order: [['id', 'DESC'], [Set, 'name', 'DESC']] })

            return res.json(collections)
        } catch (e) { return next(ApiError.badRequest('Bad request')) }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params

            const updateData = data => {
                return {
                    ...data.name !== '' && { name: data.name }
                }
            }

            const data = updateData(req.body)

            if (Object.keys(data).length === 0) return res.json({ message: 'No data updated' })

            const collection = await Collection.update(data, { returning: true, where: { id } })

            if (collection[0] === 0) return next(ApiError.notFound("Can't update unexisting collection"))

            return res.json(collection)
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params

            const count = await Collection.destroy({ where: { id } })

            if (!count) return next(ApiError.notFound("Can't delete unexisting collection"))

            return res.status(204).end()
        } catch (e) { return next(ApiError.internal(e.message)) }
    }
}

module.exports = new CollectionController()
