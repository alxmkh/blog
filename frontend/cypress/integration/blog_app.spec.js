describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Test Testovich',
            username: 'test',
            password: '123'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('123')
            cy.get('#login-button').click()
            cy.contains('logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('1234')
            cy.get('#login-button').click()
            cy.contains('invalid username or password')
            cy.get('.error')
                .should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
            cy.get('html').should('not.contain', 'logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'test', password: '123' })
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('new Title')
            cy.get('#author').type('new Author')
            cy.get('#url').type('new Url')
            cy.get('#button-create-blog').click()
            cy.contains('a new blog')
            cy.contains('new Title new Author')
        })

        it('checks that user can like a blog', function() {
            cy.createBlog({ title: 'new Title', author: 'new Author', url: 'new Url', likes: '1' })
            cy.get('#view-hidden-button').click()
            cy.get('#idLikeDiv').contains('1')
            cy.get('#like-button').click()
            cy.get('#idLikeDiv').contains('2')
        })

        it('delete blog by owner', function() {
            cy.createBlog({ title: 'new Title', author: 'new Author', url: 'new Url', likes: '1' })
            cy.get('#idDivElementForBlogList').children().should('have.length', 1)
            cy.get('#view-hidden-button').click()
            cy.get('#idDeleteBlogButton').click()
            cy.get('#idDivElementForBlogList').children().should('not.exist')
        })

        it('other user cannot delete blog', function() {
            cy.createBlog({ title: 'new Title', author: 'new Author', url: 'new Url', likes: '1' })
            const user = {
                name: 'Other User',
                username: 'other_test',
                password: '1234'
            }
            cy.logout()
            cy.request('POST', 'http://localhost:3001/api/users/', user)
            cy.login({ username: 'other_test', password: '1234' })
            cy.get('#view-hidden-button').click()
            cy.get('#idDeleteBlogButton').should('not.exist')
        })

        it('blogs are ordered', function() {
            cy.createBlog({ title: 'new Title', author: 'new Author', url: 'new Url', likes: '100' })
            cy.createBlog({ title: 'new Title', author: 'new Author', url: 'new Url', likes: '50' })
            cy.createBlog({ title: 'new Title', author: 'new Author', url: 'new Url', likes: '500' })
            cy.createBlog({ title: 'new Title', author: 'new Author', url: 'new Url', likes: '233' })
            cy.createBlog({ title: 'new Title', author: 'new Author', url: 'new Url', likes: '34' })
            cy.createBlog({ title: 'new Title', author: 'new Author', url: 'new Url', likes: '20' })
            let likesArray = []
            cy.get('#idDivElementForBlogList').children().each(item => {
                item[0].children[0].click()
                likesArray.push(Number(item[0].children[2].children[0].textContent))
            }).then(() => {
                let sortedArray = [...likesArray]
                sortedArray.sort(function(a, b) {
                    return a - b;
                }).reverse()
                expect(sortedArray).to.deep.eq(likesArray)
            })
        })
    })
})