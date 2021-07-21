const { Set } = require('../models')
const ApiError = require('../errors/apiError')

class SetController {
    async create(req, res, next) {
        try {
            let { name, colors, topSizes, bottomSizes, collectionId } = req.body

            if (!name) return next(ApiError.badRequest("Can't create unnamed set"))

            if (!collectionId) return next(ApiError.badRequest("Can't create set without collection"))

            colors = colors.replace(/\s/g, '').split(',')
            topSizes = topSizes.replace(/\s/g, '').split(',')
            bottomSizes = bottomSizes.replace(/\s/g, '').split(',')

            const set = await Set.create({ name, colors, topSizes, bottomSizes, collectionId })

            return res.json(set)
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async get(req, res, next) {
        try {
            const { id } = req.query || {}

            if (id) {
                const set = await Set.findOne({ where: { id } })

                return res.json(set)
            }

            const sets = await Set.findAll()

            return res.json(sets)
        } catch (e) { return next(ApiError.badRequest('Bad request')) }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params

            const updateData = data => {
                data.colors = data.colors.replace(/\s/g, '').split(',')
                data.topSizes = data.topSizes.replace(/\s/g, '').split(',')
                data.bottomSizes = data.bottomSizes.replace(/\s/g, '').split(',')

                return {
                    ...data.name !== '' && { name: data.name },
                    ...data.colors[0] !== '' && { colors: data.colors },
                    ...data.topSizes[0] !== '' && { topSizes: data.topSizes },
                    ...data.bottomSizes[0] !== '' && { bottomSizes: data.bottomSizes },
                    ...data.collectionId !== '' && { collectionId: data.collectionId }
                }
            }

            const data = updateData(req.body)

            if (Object.keys(data).length === 0) return res.json({ message: 'No data updated' })

            const set = await Set.update(data, { returning: true, where: { id } })

            if (set[0] === 0) return next(ApiError.notFound("Can't update unexisting set"))

            return res.json(set)
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params

            const count = await Set.destroy({ where: { id } })

            if (!count) return next(ApiError.notFound("Can't delete unexisting set"))

            return res.status(204).end()
        } catch (e) { return next(ApiError.internal(e.message)) }
    }
}

module.exports = new SetController()
