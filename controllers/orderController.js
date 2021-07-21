const nodemailer = require('nodemailer')
const { Order } = require('../models')
const { User } = require('../models')
const ApiError = require('../errors/apiError')

class OrderController {
    async create(req, res, next) {
        try {
            const { firstName, lastName, email, phone, city, address, apartment, zipCode, payment, shipping, totalPrice, paid, swimsuits } = req.body

            const user = await User.findOne({ where: { email } })

            const order = await Order.create({ firstName, lastName, email, phone, city, address, apartment, zipCode, payment, shipping, totalPrice, paid, swimsuits, userId: user ? user.id : null })

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.GMAIL_EMAIL, pass: process.env.GMAIL_PASSWORD }
            })

            const mainOptions = {
                from: process.env.GMAIL_EMAIL,
                to: user.email,
                subject: 'Order',
                text: `Thank you for your order!\nYour order id is: ${ order.id }\nYou can see your order details in the link below:\n${ process.env.ORDERS_URL }`
            }

            transporter.sendMail(mainOptions, err => {
                if (err) console.log(err)
            })

            return res.json(order)
        } catch (e) { return  next(ApiError.badRequest(e.message)) }
    }

    async get(req, res, next) {
        try {
            if (req.role === 'ADMIN') {
                const orders = await Order.findAll({ order: [['id', 'DESC']] })

                return res.json(orders)
            }

            const orders = await Order.findAll({ where: { userId: req.id }, order: [['id', 'DESC']] })

            return res.json(orders)
        } catch (e) { return next(ApiError.badRequest('Bad request')) }
    }
}

module.exports = new OrderController()
