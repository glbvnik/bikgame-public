import api from './http'

const createCollection = name => {
    return api.post(process.env.NEXT_PUBLIC_API_COLLECTION, { name })
}

const getCollection = () => {
    return api.get(process.env.NEXT_PUBLIC_API_COLLECTION)
}

const updateCollection = (id, name) => {
    return api.patch(`${ process.env.NEXT_PUBLIC_API_COLLECTION }/${ id }`, { name })
}

const delCollection = id => {
    return api.delete(`${ process.env.NEXT_PUBLIC_API_COLLECTION }/${ id }`)
}

export { createCollection, getCollection, updateCollection, delCollection }
