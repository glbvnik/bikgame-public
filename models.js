const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    code: { type: DataTypes.STRING, allowNull: false },
    reset: { type: DataTypes.STRING }
})

const Token = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    index: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Swimsuit = sequelize.define('swimsuit', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT },
    color: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER }
})

const Collection = sequelize.define('collection', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Set = sequelize.define('set', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    colors: { type: DataTypes.ARRAY(DataTypes.STRING) },
    topSizes: { type: DataTypes.ARRAY(DataTypes.STRING) },
    bottomSizes: { type: DataTypes.ARRAY(DataTypes.STRING) }
})

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Image = sequelize.define('image', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    alt: { type: DataTypes.STRING, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false },
    position: { type: DataTypes.STRING }
})

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    apartment: { type: DataTypes.STRING },
    zipCode: { type: DataTypes.INTEGER, allowNull: false },
    payment: { type: DataTypes.STRING, allowNull: false },
    shipping: { type: DataTypes.STRING, allowNull: false },
    totalPrice: { type: DataTypes.INTEGER, allowNull: false },
    paid: { type: DataTypes.INTEGER, allowNull: false },
    swimsuits: { type: DataTypes.ARRAY(DataTypes.JSON) }
})

const Price = sequelize.define('price', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false }
})

const Page = sequelize.define('page', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    text: { type: DataTypes.TEXT }
})

User.hasMany(Order)
Order.belongsTo(User)

User.hasOne(Token)
Token.belongsTo(User)

Collection.hasMany(Swimsuit)
Swimsuit.belongsTo(Collection)

Collection.hasMany(Set)
Set.belongsTo(Collection)

Set.hasMany(Swimsuit)
Swimsuit.belongsTo(Set)

Type.hasMany(Swimsuit)
Swimsuit.belongsTo(Type)

Swimsuit.hasMany(Image)
Image.belongsTo(Swimsuit, { constraints: false })

module.exports = { User, Token, Swimsuit, Collection, Set, Type, Image, Order, Price, Page }
