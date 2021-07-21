const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const { Token } = require('./models')

const generateAccessJwt = (id, email, role) => jwt.sign({ id, email, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 900 })
const generateRefreshJwt = index => jwt.sign({ index }, process.env.REFRESH_TOKEN_SECRET)

const generateTokens = async (res, id, email, role) => {
    const index = uuid.v4()

    const tokens = {
        access: generateAccessJwt(id, email, role),
        refresh: generateRefreshJwt(index)
    }

    const oldToken = await Token.findOne({ where: { userId: id } })

    if (!oldToken) {
        await Token.create({ index, userId: id })
    } else {
        await Token.update({ index }, { where: { userId: id } })
    }

    res.cookie('access', tokens.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'dev',
        sameSite: 'strict',
        maxAge: 900000,
        path: '/'
    })

    res.cookie('refresh', tokens.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'dev',
        sameSite: 'strict',
        path: '/'
    })

    return tokens
}

module.exports = generateTokens
