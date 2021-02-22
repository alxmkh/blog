const _ = require('lodash');

const blogs = [
    {
        "title": "My first post",
        "author": "Ivanich",
        "url": "www.google.com",
        "likes": 1,
        "id": "5ffb550b7af54f056ed6a2cd"
    },
    {
        "title": "My first post",
        "author": "Ivanich",
        "url": "www.google.com",
        "likes": 1,
        "id": "5ffb550b7af54f056ed6a2cd22"
    },
    {
        "title": "My second post",
        "author": "Alexeich",
        "url": "www.ya.ru",
        "likes": 22,
        "id": "5ffc89dac165421071633606"
    },
    {
        "title": "My third post",
        "author": "Mashich",
        "url": "www.rambler.ru",
        "likes": 3,
        "id": "5ffc8c294d35f21120f1320d"
    },
    {
        "title": "My third post",
        "author": "Mashich",
        "url": "www.rambler.ru",
        "likes": 3,
        "id": "5ffc8c294d35f21120f1320d"
    },
    {
        "title": "My third post",
        "author": "Mashich",
        "url": "www.rambler.ru",
        "likes": 3,
        "id": "5ffc8c294d35f21120f1320d"
    },
    {
        "title": "My third post",
        "author": "Mashich",
        "url": "www.rambler.ru",
        "likes": 3,
        "id": "5ffc8c294d35f21120f1320d"
    },
    {
        "title": "My third post",
        "author": "Mashich",
        "url": "www.rambler.ru",
        "likes": 3,
        "id": "5ffc8c294d35f21120f1320d"
    },
    {
        "title": "My fourth post",
        "author": "Dimich",
        "url": "www.yahoo.ru",
        "likes": 5,
        "id": "5ffcba5bdbf5ac13390cb6d9"
    },
    {
        "title": "My fourth post",
        "author": "Dimich",
        "url": "www.yahoo.ru",
        "likes": 5,
        "id": "5ffcba5bdbf5ac13390cb6d9"
    },
    {
        "title": "My fourth post",
        "author": "Dimich",
        "url": "www.yahoo.ru",
        "likes": 5,
        "id": "5ffcba5bdbf5ac13390cb6d9"
    },
    {
        "title": "My fourth post",
        "author": "Dimich",
        "url": "www.yahoo.ru",
        "likes": 5,
        "id": "5ffcba5bdbf5ac13390cb6d9"
    }
]
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, current) => {
        return sum + current.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => {
        return blog.likes > max.likes ? blog : max
    }, blogs[0]);
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const pairs = _.values(_.groupBy(authors)).map(d => ({
        author: d[0], blogs: d.length
    }))
    return pairs.reduce((max, item) => {
        return item.blogs > max.blogs ? item : max
    }, pairs[0])
}

const mostLikes = (blogs) => {
    const maxLikes = blogs.reduce((max, item) => {
        return item.likes > max.likes ? item : max
    }, blogs[0])
    return { 'author': maxLikes.author, 'likes': maxLikes.likes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

