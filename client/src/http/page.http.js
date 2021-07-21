import api from './http'

const getPage = name => {
    return api.get(`${ process.env.NEXT_PUBLIC_API_PAGE }/${ name }`)
}

const updatePage = (name, text) => {
    return api.patch(`${ process.env.NEXT_PUBLIC_API_PAGE }/${ name }`, { name, text })
}

export { getPage, updatePage }
