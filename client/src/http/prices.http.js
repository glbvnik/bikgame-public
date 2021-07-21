import api from './http'


const getPrice = () => {
    return api.get(process.env.NEXT_PUBLIC_API_PRICE)
}

const updatePrice = (id, price) => {
    return api.patch(`${ process.env.NEXT_PUBLIC_API_PRICE }/${ id }`, { price })
}

export { getPrice, updatePrice }
