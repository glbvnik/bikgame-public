import api from './http'

const signUp = (firstName, lastName, email, password) => {
    return api.post(process.env.NEXT_PUBLIC_API_SIGNUP, { firstName, lastName, email, password })
}

const verify = code => {
    return api.get(`${ process.env.NEXT_PUBLIC_API_VERIFY }/${ code }`)
}

const signIn = (email, password) => {
    return api.post(process.env.NEXT_PUBLIC_API_SIGNIN, { email, password })
}

const check = () => {
    return api.get(process.env.NEXT_PUBLIC_API_CHECK)
}

const clear = () => {
    return api.get(process.env.NEXT_PUBLIC_API_CLEAR)
}

const getData = () => {
    return api.get(process.env.NEXT_PUBLIC_API_GET_DATA)
}

const updateReset = email => {
    return api.put(process.env.NEXT_PUBLIC_API_RESET, { email })
}

const resetPassword = (reset, password) => {
    return api.put(`${ process.env.NEXT_PUBLIC_API_RESET }/${ reset }`, { password })
}

export { signIn, verify, signUp, check, clear, getData, updateReset, resetPassword }
