const listHelper = require('../utils/list_helper')
describe('favorite blog', () => {
    const favoriteBlog = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.favoriteBlog(favoriteBlog)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
})
