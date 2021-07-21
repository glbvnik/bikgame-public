const path = require('path')
const uuid = require('uuid')
const fs = require('fs')
const { Image } = require('../models')
const ApiError = require('../errors/apiError')

class ImageController {
    async create(req, res, next) {
        try {
            let { images } = req.body
            const { alt, order, position, swimsuitId } = req.body
            const { imgs } = req.files || {}

            if (imgs) {
                if (images) {
                    images = JSON.parse(images)

                    const oldImages = await Image.findAll({ where: { swimsuitId: images[0].swimsuitId } })

                    if (oldImages.length !== 0) {
                        const list = fs.readdirSync(path.resolve(path.resolve(__dirname, '../', 'static')))

                        oldImages.forEach(img => {
                            if (list.includes(img.name)) {
                                fs.unlinkSync(path.resolve(__dirname, '../', 'static', img.name))

                                Image.destroy({ where: { id: img.id } })
                            }
                        })
                    }

                if (Array.isArray(imgs)) {
                    for (let i = 0; i < images.length; i++) {
                        const imgName = uuid.v4() + '.' + imgs[i].mimetype.split('/')[1]

                        await imgs[i].mv(path.resolve(__dirname, '..', 'static', imgName))

                        const img = images[i]

                        await Image.create({ type: 'swimsuit', name: imgName, alt: img.alt, order: img.order, swimsuitId: img.swimsuitId })
                    }
                } else {
                    const imgName = uuid.v4() + '.' + imgs.mimetype.split('/')[1]

                    await imgs.mv(path.resolve(__dirname, '..', 'static', imgName))

                    const img = images[0]

                    await Image.create({ type: 'swimsuit', name: imgName, alt: img.alt, order: img.order, swimsuitId: img.swimsuitId })
                }

                    return res.json({ message: 'Images were uploaded' })
                }

                if (alt === '') return next(ApiError.badRequest("Can't create image without swimsuit"))

                const imgName = uuid.v4() + '.' + imgs.mimetype.split('/')[1]

                await imgs.mv(path.resolve(__dirname, '..', 'static', imgName))

                const image = await Image.create({ name: imgName, alt, order, position, swimsuitId })

                return res.json(image)
            } else {
                return next(ApiError.badRequest('No image found'))
            }
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async get(req, res, next) {
        try {
            const images = await Image.findAll({ where: { type: null }, order: [['order', 'DESC']] })

            return res.json(images)
        } catch (e) { return next(ApiError.badRequest('Bad request')) }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params

            const updateData = data => {
                return {
                    ...data.alt !== '' && { alt: data.alt },
                    ...data.order !== '' && { order: data.order },
                    ...data.position !== '' && { position: data.position }
                }
            }

            const { img } = req.files || {}

            if (img) {
                const oldImg = await Image.findByPk(id)

                fs.unlinkSync(path.resolve(__dirname, '../', 'static', oldImg.name))

                img.mv(path.resolve(__dirname, '..', 'static', oldImg.name))

                const image = await Image.update(updateData(req.body), { returning: true, where: { id } })

                return res.json(image)
            }

            const image = await Image.update(updateData(req.body), { returning: true, where: { id } })

            return res.json(image)
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const { type } = req.query || {}

            const list = fs.readdirSync(path.resolve(path.resolve(__dirname, '../', 'static')))

            if (type === 'swimsuit') {
                const oldImages = await Image.findAll({ where: { swimsuitId: id } })

                if (oldImages.length !== 0) {
                    oldImages.forEach(img => {
                        if (list.includes(img.name)) fs.unlinkSync(path.resolve(__dirname, '../', 'static', img.name))
                    })

                    const count = await Image.destroy({ where: { swimsuitId: id } })

                    if (!count) return next(ApiError.notFound("Can't delete unexisting image"))
                }
            } else {
                const oldImg = await Image.findByPk(id)

                if (oldImg) if (list.includes(oldImg.name)) fs.unlinkSync(path.resolve(__dirname, '../', 'static', oldImg.name))

                const count = await Image.destroy({ where: { id } })

                if (!count) return next(ApiError.notFound("Can't delete unexisting image"))
            }

            return res.status(204).end()
        } catch (e) { return next(ApiError.internal(e.message)) }
    }
}

module.exports = new ImageController()
