const blogsRouter = require('express').Router()
const Item = require('../models/item')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const items = await  Item.find({}).populate('user', { username: 1, name: 1 })
        response.json(items)
    } catch (error) {
        next(error)
    }

})

blogsRouter.get('/:id', async (request, response, next) => {
    try{
        const blog = await Item.findById(request.params.id)
        if (blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).json({error: `no record with id ${request.params.id}`}).end()
        }
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        if (body.url === undefined && body.title === undefined) {
            throw new Error('miss_params')
        }
        const token = request.token
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const item = new Item ({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user
        })
        const savedItem = await item.save()
        user.blogs = user.blogs.concat(savedItem._id)
        await user.save()
        response.status(201).json(savedItem)
    }
    catch (err) {
        next(err)
    }
})

blogsRouter.delete('/:id', async(request, response, next) => {
    try {
        const token = request.token
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const blog = await Item.findById(request.params.id)
        if (blog.user.toString() === user._id.toString()) {
            await Item.findByIdAndRemove(request.params.id)
            response.status(204).end()
        }

    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    try {
        let currentBlog = await Item.findById(request.params.id)
        currentBlog.likes = body.likes
        const updatedBlog = await Item.findByIdAndUpdate(request.params.id, currentBlog, {new: true})
        response.json(updatedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter