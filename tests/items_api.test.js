const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const _ = require('lodash')

const Item = require('../models/item')
const User = require('../models/user')

describe('all test', () => {
    beforeEach(async () => {
        await Item.deleteMany({})

        const itemObjects = helper.initialItems
            .map(item => new Item(item))
        const promiseArray = itemObjects.map(item => item.save())
        await Promise.all(promiseArray)
    })
    describe('test get requests', () => {
        test('blog items are returned as json and equal 2', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const itemsAtEnd = await helper.notesInDb()
            expect(itemsAtEnd.length).toBe(helper.initialItems.length)
        })

        test('id to be defined', async () => {
            const itemsAtEnd = await helper.notesInDb()
            expect(itemsAtEnd[0].id).toBeDefined()
            const ids = _.keys(itemsAtEnd[0])
            expect(ids[4]).toEqual('id')
        })

        test('get blog by id', async () => {
            const itemsAtEnd = await helper.notesInDb()
            const id = itemsAtEnd[0].id
            await  api
                .get(`/api/blogs/${id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
    })

    describe('test put request', () => {
        test('update count likes', async  () => {
            const newCountLikes = {
                likes: 9999
            }
            const allPosts = await helper.notesInDb()
            const currentPost = allPosts[0]
            await api
                .put(`/api/blogs/${currentPost.id}`)
                .send(newCountLikes)
                .expect(200)
            const afterUpdate = await helper.notesInDb()
            expect(afterUpdate[0].likes).toBe(newCountLikes.likes)
        })
    })

    describe('test post requests', () => {
        test('a valid post can be added ', async () => {
            const newPost = {
                title: 'My test post',
                author: 'MaximichTest',
                url: 'www.ramblertest.ru',
                likes: 6666
            }

            let token = null;

            const newUser = {
                username: "TestUser",
                name: "TestUser TestUser",
                password: "123"
            }

            await api
                .post('/api/users')
                .send(newUser)

            await  api
                .post('/api/login')
                .send({
                    "username": 'TestUser',
                    "password": '123'
                })
                .then((response) => {
                    token = response.body.token
                })

            await api
                .post('/api/blogs')
                .set('Authorization', 'bearer ' + token)
                .send(newPost)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const notesAtEnd = await helper.notesInDb()
            expect(notesAtEnd.length).toBe(helper.initialItems.length + 1)
            const contents = notesAtEnd.map(n => n.title)
            expect(contents).toContain(
                'My test post'
            )
        })

        test('add new post without auth', async  () => {
            const newPost = {
                title: 'My test post',
                author: 'MaximichTest',
                url: 'www.ramblertest.ru',
            }

            await api
                .post('/api/blogs')
                .send(newPost)
                .expect(401)
        })

        test ('add new post without likes', async () => {
            const newPost = {
                title: 'My test post',
                author: 'MaximichTest',
                url: 'www.ramblertest.ru',
            }

            let token = null;

            const newUser = {
                username: "TestUser",
                name: "TestUser TestUser",
                password: "123"
            }

            await api
                .post('/api/users')
                .send(newUser)

            await  api
                .post('/api/login')
                .send({
                    "username": 'TestUser',
                    "password": '123'
                })
                .then((response) => {
                    token = response.body.token
                })


            await api
                .post('/api/blogs')
                .set('Authorization', 'bearer ' + token)
                .send(newPost)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const notesAtEnd = await helper.notesInDb()
            const contents = notesAtEnd.map(n => n.likes)
            expect(contents[contents.length-1]).toEqual(
                0
            )
        })

        test ('post request without title and url', async () => {
            const newPost = {
                author: 'MaximichTest',
                likes: 22
            }

            await api
                .post('/api/blogs')
                .send(newPost)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    })

    describe('test delete requests', () => {
        test ('delete post', async () => {
            const newPost = {
                title: 'My test post',
                author: 'MaximichTest',
                url: 'www.ramblertest.ru',
            }

            let token = null;

            const newUser = {
                username: "TestUser",
                name: "TestUser TestUser",
                password: "123"
            }

            await api
                .post('/api/users')
                .send(newUser)

            await  api
                .post('/api/login')
                .send({
                    "username": 'TestUser',
                    "password": '123'
                })
                .then((response) => {
                    token = response.body.token
                })

            let id = null

            await api
                .post('/api/blogs')
                .set('Authorization', 'bearer ' + token)
                .send(newPost)
                .expect(201)
                .expect('Content-Type', /application\/json/)
                .then(request => {
                    id = request.body.id
                    console.log('IDIDIDD: ', id)
                })

            const blogsAtStart = await helper.notesInDb()
            console.log('nachalo: ',blogsAtStart.length)

            await api
                .delete(`/api/blogs/${id}`)
                .set('Authorization', 'bearer ' + token)
                .expect(204)

            const blogsAtEnd = await helper.notesInDb()
            console.log('konetc: ', blogsAtEnd.length)
            expect(blogsAtEnd.length).toBe(
                blogsAtStart.length - 1
            )

            const ids = blogsAtEnd.map(r => r.id)

            expect(ids).not.toContain(id)
        })
    })

    describe('when there is initially one user at db', () => {
        beforeEach(async () => {
            await User.deleteMany({})
            const user = new User({ username: 'root', password: 'sekret' })
            await user.save()
        })

        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'mluukkai',
                name: 'Matti Luukkainen',
                password: 'salainen',
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
        })

        test('creation fails with proper status code and message if username already taken', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'root',
                name: 'Superuser',
                password: 'salainen',
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('`username` to be unique')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)
        })
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})
