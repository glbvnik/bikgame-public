require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const router = require('./routes/index')
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware')

const app = express()

app.use(cors({ credentials: true, origin: process.env.NODE_ENV === 'dev' ? process.env.LOCALHOST : ['http://bikgame.shop', 'http://www.bikgame.shop', 'https://bikgame.shop', 'https://www.bikgame.shop'] }))
app.use(express.json())
app.use('/api', express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(cookieParser())
app.use('/api', router)
app.use(errorHandlingMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: false })

        const PORT = 5000

        app.listen(PORT, () => console.log(`Server is working on port ${ PORT }`))
    } catch(e) { console.log(e) }
}

start()
