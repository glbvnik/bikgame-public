import api from './http'

const createType = name => {
    return api.post(process.env.NEXT_PUBLIC_API_TYPE, { name })
}

const getType = () => {
    return api.get(process.env.NEXT_PUBLIC_API_TYPE)
}

const updateType = (id, name) => {
    return api.patch(`${ process.env.NEXT_PUBLIC_API_TYPE }/${ id }`, { name })
}

const delType = id => {
    return api.delete(`${ process.env.NEXT_PUBLIC_API_TYPE }/${ id }`)
}

export { createType, getType, updateType, delType }
