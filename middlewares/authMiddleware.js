const jwt = require('jsonwebtoken')
const generateTokens = require('../tokens')
const { Token } = require('../models')
const { User } = require('../models')

module.exports = role => {
    return async (req, res, next) => {
        if (req.method === 'OPTIONS') return next()

        try {
            let access = req.cookies.access

            if (!access) {
                const refresh = req.cookies.refresh

                if (!refresh) return res.status(401).json({ message: 'Bad authentication' })

                const decodedRefresh = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET)

                const token = await Token.findOne({ where: { index: decodedRefresh.index } })

                if (!token) return res.status(401).json({ message: 'Bad authentication' })

                const user = await User.findOne({ where: { id: token.userId } })

                const tokens = await generateTokens(res, user.id, user.email, user.role)

                access = tokens.access
            }

            const decodedAccess = jwt.verify(access, process.env.ACCESS_TOKEN_SECRET)

            if (role) {
                if (decodedAccess.role !== role) return res.status(403).json({ message: 'Access denied' })

                return next()
            }

            req.id = decodedAccess.id
            req.role = decodedAccess.role

            return next()
        } catch (e) { return res.status(401).json({ message: 'Bad authentication' }) }
    }
}
