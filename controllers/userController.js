const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const uuid = require('uuid')
const generateTokens = require('../tokens')
const { User } = require('../models')
const { Token } = require('../models')
const { Order } = require('../models')
const ApiError = require('../errors/apiError')

class UserController {
    async signUp(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) return res.status(400).json({ message: 'Sign up error occurred', errors })

            const { email, password, firstName, lastName } = req.body

            const candidate = await User.findOne({ where: { email } })

            if (candidate) if (candidate.active) return next(ApiError.badRequest('This email address is already being used'))

            const hash = await bcrypt.hash(password, 12)

            const code = uuid.v4()

            let user

            if (candidate) {
                const found = await User.update({ firstName, lastName, password: hash, code }, { returning: true, where: { id: candidate.id } })

                user = found[1][0].dataValues
            } else {
                user = await User.create({ firstName, lastName, email, password: hash, code })
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.GMAIL_EMAIL, pass: process.env.GMAIL_PASSWORD }
            })

            const mainOptions = {
                from: process.env.GMAIL_EMAIL,
                to: user.email,
                subject: 'Account confirmation',
                text: `Thank you for registration to BIKGAME!\nClick on the link below to verify your email address:\n${ process.env.EMAIL_VERIFICATION_URL }/${ code }`
            }

            transporter.sendMail(mainOptions, err => {
                if (err) console.log(err)
            })

            return res.json({message: 'Verify your email'})
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async verify(req, res, next) {
        try {
            const code = req.params.id

            const candidate = await User.findOne({ where: { code } })

            if (!candidate) res.json({ route: process.env.SIGNUP_ROUTE })

            if (candidate.active) {
                await generateTokens(res, candidate.id, candidate.email, candidate.role)

                return res.json({ route: process.env.SWIMSUITS_ROUTE })
            }

            const found = await User.update({ active: true }, { returning: true, where: { code } })

            if (found[0] === 0) return next(ApiError.badRequest('No user found'))

            const user = found[1][0].dataValues

            await Order.update({ userId: user.id }, { where: { email: user.email } })

            await generateTokens(res, user.id, user.email, user.role)

            return res.json({ route: process.env.SUCCESS_ROUTE })
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ where: { email } })

            if(!user) return next(ApiError.unauthorized('Invalid username or password'))

            if(!user.active) return next(ApiError.unauthorized('Invalid username or password'))

            const comparePassword = bcrypt.compareSync(password, user.password)

            if(!comparePassword) return next(ApiError.unauthorized('Invalid username or password'))

            await generateTokens(res, user.id, user.email, user.role)

            return res.json({ role: user.role })
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async check(req, res, next) {
        try {
            let access = req.cookies.access

            if (!access) {
                const refresh = req.cookies.refresh

                if (!refresh) return res.end()

                const decodedRefresh = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET)

                const token = await Token.findOne({ where: { index: decodedRefresh.index } })

                if (!token) return res.end()

                const user = await User.findOne({ where: { id: token.userId } })

                const tokens = await generateTokens(res, user.id, user.email, user.role)

                access = tokens.access
            }

            const decodedAccess = jwt.verify(access, process.env.ACCESS_TOKEN_SECRET)

            return res.json({ role: decodedAccess.role })
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async clear(req, res, next) {
        try {
            const index = jwt.verify(req.cookies.refresh, process.env.REFRESH_TOKEN_SECRET).index

            await Token.destroy({ where: { index } })

            if (req.cookies.access) res.clearCookie('access')

            res.clearCookie('refresh')

            return res.json({ message: 'Logged out' })
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async getData(req, res, next) {
        try {
            const user = await User.findOne({ where: { id: req.id } })

            return res.json({ firstName: user.firstName, lastName: user.lastName, email: user.email })
        } catch (e) { return next(ApiError.internal(e.message)) }
    }

    async updateReset(req, res, next) {
        try {
            const { email } = req.body

            const reset = uuid.v4()

            const user = await User.update({ reset }, { returning: true, where: { email } })

            if (user[0] === 0) return next(ApiError.badRequest('No user found with that email'))

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {user: process.env.GMAIL_EMAIL, pass: process.env.GMAIL_PASSWORD}
            })

            const mainOptions = {
                from: process.env.GMAIL_EMAIL,
                to: user[1][0].dataValues.email,
                subject: 'PasswordComponent password',
                text: `Click on the link below to reset your password:\n${ process.env.RESET_URL }/${ reset }`
            }

            transporter.sendMail(mainOptions, err => {
                if (err) console.log(err)
            })

            return res.json({ message: 'Check your email please' })
        } catch (e) {return next(ApiError.internal(e.message))}
    }

    async resetPassword(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) return res.status(400).json({ message: errors.errors[0].msg })

            const { id } = req.params

            const { password } = req.body

            const hash = await bcrypt.hash(password, 12)

            const user = await User.update({ password: hash, reset: null }, { returning: true, where: { reset: id } })

            if (user[0] === 0) return next(ApiError.badRequest('Bad request'))

            return res.json({message: 'Password changed successfully'})
        } catch (e) { return next(ApiError.internal(e.message)) }
    }
}

module.exports = new UserController()
