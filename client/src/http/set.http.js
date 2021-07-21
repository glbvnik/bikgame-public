import api from './http'

const createSet = (name, colors, topSizes, bottomSizes, collectionId) => {
    return api.post(process.env.NEXT_PUBLIC_API_SET, { name, colors, topSizes, bottomSizes, collectionId })
}

const getSet = id => {
    return api.get(process.env.NEXT_PUBLIC_API_SET, { params: { id } })
}

const updateSet = (id, name, colors, topSizes, bottomSizes, collectionId) => {
    return api.patch(`${ process.env.NEXT_PUBLIC_API_SET }/${ id }`, { name, colors, topSizes, bottomSizes, collectionId })
}

const delSet = id => {
    return api.delete(`${ process.env.NEXT_PUBLIC_API_SET }/${ id }`)
}

export { createSet, getSet, updateSet, delSet }
