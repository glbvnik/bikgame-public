const { Type } = require('../models')
const ApiError = require('../errors/apiError')

class TypeController {
    async create(req, res, next) {
        try {
            const { name } = req.body

            if (!name) return next(ApiError.badRequest("Can't create unnamed type"))

            const type = await Type.create({ name })

            return res.json(type)
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async get(req, res, next) {
        try {
            const { id } = req.query || {}

            if (id) {
                const type = await Type.findOne({ where: { id } })

                return res.json(type)
            }

            const types = await Type.findAll()

            return res.json(types)
        } catch (e) { return next(ApiError.badRequest('Bad request')) }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id

            const updateData = data => {
                return {
                    ...data.name !== '' && { name: data.name }
                }
            }

            const data = updateData(req.body)

            if (Object.keys(data).length === 0) return res.json({ message: 'No data updated' })

            const type = await Type.update(data, { where: { id }, returning: true })

            if (type[0] === 0) return next(ApiError.notFound("Can't update unexisting type"))

            return res.json(type)
        } catch (e) {return next(ApiError.internal(e.message))}
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id

            const count = await Type.destroy({ where: { id } })

            if (!count) return next(ApiError.notFound("Can't delete unexisting type"))

            return res.status(204).end()
        } catch (e) { return next(ApiError.internal(e.message)) }
    }
}

module.exports = new TypeController()
