const { Swimsuit } = require('../models')
const { Image } = require('../models')
const ApiError = require('../errors/apiError')

class SwimsuitController {
    async create(req, res, next) {
        try {
            const { name, description, color, price, collectionId, setId, typeId } = req.body

            if (name === '') return next(ApiError.badRequest("Can't create swimsuit without name"))

            if (collectionId === '' || setId === '' || typeId === '') return next(ApiError.badRequest("Can't create swimsuit without collection, set or type"))

            const swimsuit = await Swimsuit.create({ name, description, color, price: price !== '' ? price : null, collectionId, setId, typeId })

            return res.json(swimsuit)
        } catch (e) { return next(ApiError.badRequest(e.message)) }
    }

    async get(req, res, next) {
        try {
            const { collectionId, setId, typeId, id } = req.query

            if(!collectionId && !setId && !typeId && !id) {
                const swimsuits = await Swimsuit.findAll({ where: { '$images.order$': 1 }, include: [{ model: Image, as: 'images' }], order: [['collectionId', 'DESC'], ['setId', 'DESC'], ['name', 'ASC']] })

                return res.json(swimsuits)
            }

            if(collectionId && !setId && !typeId && !id) {
                const swimsuits = await Swimsuit.findAll({ where: { collectionId, '$images.order$': 1 }, include: [{ model: Image, as: 'images' }], order: [['collectionId', 'DESC'], ['setId', 'DESC'], ['name', 'ASC']] })

                return res.json(swimsuits)
            }

            if(collectionId && setId && !typeId && !id) {
                const swimsuits = await Swimsuit.findAll({ where: { collectionId, setId, '$images.order$': 1 }, include: [{ model: Image, as: 'images' }], order: [['collectionId', 'DESC'], ['setId', 'DESC'], ['name', 'ASC']] })

                return res.json(swimsuits)
            }

            if(!collectionId && !setId && typeId && !id) {
                const swimsuits = await Swimsuit.findAll({ where: { typeId, '$images.order$': 1 }, include: [{ model: Image, as: 'images' }], order: [['collectionId', 'DESC'], ['setId', 'DESC'], ['name', 'ASC']] })

                return res.json(swimsuits)
            }

            if (collectionId && !setId && typeId && !id) {
                const swimsuits = await Swimsuit.findAll({ where: { collectionId, typeId, '$images.order$': 1 }, include: [{ model: Image, as: 'images' }], order: [['collectionId', 'DESC'], ['setId', 'DESC'], ['name', 'ASC']] })

                return res.json(swimsuits)
            }

            if (collectionId && setId && typeId && !id) {
                const swimsuits = await Swimsuit.findAll({ where: { collectionId, setId, typeId, '$images.order$': 1 }, include: [{ model: Image, as: 'images' }], order: [['collectionId', 'DESC'], ['setId', 'DESC'], ['name', 'ASC']] })

                return res.json(swimsuits)
            }

            if (!collectionId && !setId && !typeId && id) {
                const swimsuits = await Swimsuit.findAll({ where: { id: id.split(',') } })

                return res.json(swimsuits)
            }

            return next(ApiError.badRequest('Bad request'))
        } catch (e) { return next(ApiError.badRequest(e.message)) }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params

            const swimsuit = await Swimsuit.findOne({ where: { name: id }, include: [{ model: Image, as: 'images' }], order: [[Image, 'order', 'ASC']] })

            if (!swimsuit) return next(ApiError.notFound('Swimsuit.component.js not found'))

            return res.json(swimsuit)
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params

            const updateData = data => {
                return {
                    ...data.name !== '' && { name: data.name },
                    ...data.description !== '' && { description: data.description },
                    ...data.color !== '' && { color: data.color },
                    ...data.price !== '' && { price: data.price },
                    ...data.collectionId !== '' && { collectionId: data.collectionId },
                    ...data.setId !== '' && { setId: data.setId },
                    ...data.typeId !== '' && { typeId: data.typeId }
                }
            }

            const data = updateData(req.body)

            if (Object.keys(data).length === 0) return res.json({ message: 'No data updated' })

            const swimsuit = await Swimsuit.update(data, { returning: true, where: { id } })

            return res.json(swimsuit)
        } catch (e) { return next(ApiError.notFound('Swimsuit.component.js not found')) }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params

            const count = await Swimsuit.destroy({ where: { id } })

            if (!count) return next(ApiError.notFound("Can't delete unexisting swimsuit"))

            return res.status(204).end()
        } catch (e) { return next(ApiError.notFound('Swimsuit.component.js not found')) }
    }
}

module.exports = new SwimsuitController()
