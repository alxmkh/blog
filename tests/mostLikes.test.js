const listHelper = require('../utils/list_helper')

describe('most likes blog', () => {
    const favoriteBlog = [
        {
            "title": "My third post",
            "author": "Mashich",
            "url": "www.rambler.ru",
            "likes": 3,
            "id": "5ffc8c294d35f21120f1320d"
        }]

    test('find author who has the largest amount of likes in blog', () => {
        const result = listHelper.mostLikes(favoriteBlog)
        expect(result).toEqual({
            author: "Mashich",
            likes: 3
        })
    })
})
