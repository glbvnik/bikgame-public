import { createSwimsuit, delSwimsuit, updateSwimsuit } from './swimsuit.http'
import { createImage, delImage, updateImage } from './image.http'
import { createCollection, delCollection, updateCollection } from './collection.http'
import { createSet, delSet, updateSet } from './set.http'
import { createType, delType, updateType } from './type.http'
import { updatePrice } from './prices.http'

const postImages = (images, swimsuit, change) => {
    const formData = new FormData()

    const imagesData = []

    images.forEach(image => {
        imagesData.push({ alt: image.alt, order: image.order, swimsuitId: swimsuit })

        formData.append('imgs', image.image)
    })

    formData.append('images', JSON.stringify(imagesData))

    return createImage(formData).catch(e => {
        if (!change) delSwimsuit(swimsuit)

        return e
    })
}

const mainImages = images => {
    const imagesData = []

    images.forEach(image => {
        const formData = new FormData()

        formData.id = image.id

        formData.append('alt', image.alt)
        formData.append('order', image.order)
        formData.append('position', image.position)
        formData.append('imgs', image.image)

        imagesData.push(formData)
    })

    return imagesData
}

const requests = async (action, inputs, images, imageId) => {
    let res

    switch (action) {
        case 'Create Swimsuit.component.js':
            const firstImg = images.find(({order}) => Number.parseInt(order) === 1)

            if (typeof firstImg === 'undefined') throw "Can't create swimsuit without first image"

            if (typeof firstImg !== 'undefined') if (!firstImg.image) throw "Can't create swimsuit without first image"

            return createSwimsuit(inputs.name, inputs.description, inputs.color, inputs.price, inputs.collectionId, inputs.setId, inputs.typeId)
                .then(async ({ data }) => {
                    if (images) {
                        const err = await postImages(images, data.id)

                        if (err instanceof Error) throw err.response.data.message
                    }
                })

        case 'Change Swimsuit.component.js':
            if (!inputs.swimsuitId) throw 'Select swimsuit'

            return updateSwimsuit(inputs.swimsuitId, inputs.name, inputs.description, inputs.color, inputs.price, inputs.collectionId, inputs.setId, inputs.typeId)
                .then(async () => {
                    if (images) {
                        const { data: err } = postImages(images, inputs.swimsuitId, true)

                        if (typeof err !== 'undefined') throw err
                    }
                })

        case 'Delete Swimsuit.component.js':
            if (!inputs.swimsuitId) throw 'Select swimsuit'

            return delImage(inputs.swimsuitId, 'swimsuit').then(() => delSwimsuit(inputs.swimsuitId))

        case 'Create Collection':
            res = await createCollection(inputs.name)

            return res

        case 'Change Collection':
            if (!inputs.dataId) throw 'Select collection'

            res = await updateCollection(inputs.dataId, inputs.name)

            return res

        case 'Delete Collection':
            if (!inputs.dataId) throw 'Select collection'

            res = await delCollection(inputs.dataId)

            return res

        case 'Create Set':
            res =await createSet(inputs.name, inputs.colors, inputs.topSizes, inputs.bottomSizes, inputs.collectionId)

            return res

        case 'Change Set':
            if (!inputs.dataId) throw 'Select set'

            res = await updateSet(inputs.dataId, inputs.name, inputs.colors, inputs.topSizes, inputs.bottomSizes, inputs.collectionId)

            return res

        case 'Delete Set':
            if (!inputs.dataId) throw 'Select set'

            res = await delSet(inputs.dataId)

            return res

        case 'Create Type':
            res = await createType(inputs.name)

            return res

        case 'Change Type':
            if (!inputs.dataId) throw 'Select type'

            res = await updateType(inputs.dataId, inputs.name)

            return res

        case 'Delete Type':
            if (!inputs.dataId) throw 'Select type'

            res = await delType(inputs.dataId)

            return res

        case 'Change Prices':
            return Promise.all(inputs.map(price => updatePrice(price.id, price.price)))

        case 'Create Main Images':
            if (images.length === 0) throw 'Add images'

            return Promise.all(mainImages(images).map(formData => createImage(formData)))

        case 'Change Main Images':
            if (images.length === 0) throw 'No images found'

            return Promise.all(mainImages(images).map(formData => updateImage(formData.id, formData)))

        case 'Delete Main Images':
            res = await delImage(imageId)

            return res
    }
}

export default requests
