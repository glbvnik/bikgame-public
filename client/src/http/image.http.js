import api from './http'

const createImage = formData => {
    return api.post(process.env.NEXT_PUBLIC_API_IMAGE, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

const getImage = () => {
    return api.get(process.env.NEXT_PUBLIC_API_IMAGE)
}

const updateImage = (id, formData) => {
    return api.patch(`${ process.env.NEXT_PUBLIC_API_IMAGE }/${ id }`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

const delImage = (id, type) => {
    return api.delete(`${ process.env.NEXT_PUBLIC_API_IMAGE }/${ id }`, { params: { type: type } })
}

export { createImage, getImage, updateImage, delImage }
