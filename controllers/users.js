const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User
            .find({}).populate('blogs', {title: 1, url: 1, likes: 1})
        response.json(users.map(u => u.toJSON()))
    } catch (e) {
        next(e)
    }
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        if (body.password.length < 3) {
            throw new Error('password_lenth_exception')
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (e) {
        next(e)
    }
})

module.exports = usersRouter