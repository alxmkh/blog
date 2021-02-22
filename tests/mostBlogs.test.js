const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    const favoriteBlog = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }]

    test('find author who has the largest amount of blogs.', () => {
        const result = listHelper.mostBlogs(favoriteBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })
})
