const Item = require('../models/item')
const User = require('../models/user')

const initialItems = [
    {
        title : 'My first test post',
        author: 'Test Ivan',
        url: 'www.testgoogle.com',
        likes: 1,
    },
    {
        title : 'My second test post',
        author: 'Test Alexey',
        url: 'www.testyandex.com',
        likes: 2,
    }
]

const nonExistingId = async () => {
    const item = new Item({
        title : 'willremovethissoon',
        author: 'willremovethissoon',
        url: 'willremovethissoon',
        likes: 0,
    })
    await item.save()
    await item.remove()

    return item._id.toString()
}

const notesInDb = async () => {
    const items = await Item.find({})
    return items.map(item => item.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialItems, nonExistingId, notesInDb, usersInDb
}