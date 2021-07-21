import api from './http'

const createSwimsuit = (name, description, color, price, collectionId, setId, typeId) => {
    return api.post(process.env.NEXT_PUBLIC_API_SWIMSUIT, { name, description, color, price, collectionId, setId, typeId })
}

const getSwimsuit = params => {
    return api.get(process.env.NEXT_PUBLIC_API_SWIMSUIT, { params: { ...params } })
}

const getOneSwimsuit = name => {
    return api.get(`${ process.env.NEXT_PUBLIC_API_SWIMSUIT }/${ name }`)
}

const updateSwimsuit = (id, name, description, color, price, collectionId, setId, typeId) => {
    return api.patch(`${ process.env.NEXT_PUBLIC_API_SWIMSUIT }/${ id }`, { name, description, color, price, collectionId, setId, typeId })
}

const delSwimsuit = id => {
    return api.delete(`${ process.env.NEXT_PUBLIC_API_SWIMSUIT }/${ id }`)
}

export { createSwimsuit, getSwimsuit, getOneSwimsuit, updateSwimsuit, delSwimsuit }
