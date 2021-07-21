import api from './http'

const createOrder = data => {
    return api.post(process.env.NEXT_PUBLIC_API_ORDER, data)
}

const getOrder = () => {
    return api.get(process.env.NEXT_PUBLIC_API_ORDER)
}

const updateOrder = (id, name) => {
    return api.patch(`${ process.env.NEXT_PUBLIC_API_ORDER }/${ id }`, { name })
}

const delOrder = id => {
    return api.delete(`${ process.env.NEXT_PUBLIC_API_ORDER }/${ id }`)
}

export { createOrder, getOrder, updateOrder, delOrder }
