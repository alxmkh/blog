import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('check, that the form calls the event handler it received as props with the right details when a new blog is created', () => {
    const setVisibleForm = jest.fn()
    const createNewBlog = jest.fn()
    const component = render(
        <NewBlogForm setVisibleForm={setVisibleForm} createNewBlog={createNewBlog}/>
    )
    const form = component.container.querySelector('form')

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    fireEvent.change(title, {
        target: { value: 'Title Test' }
    })
    fireEvent.change(author, {
        target: { value: 'Author Test' }
    })
    fireEvent.change(url, {
        target: { value: 'Url Test' }
    })
    fireEvent.submit(form)
    console.log(createNewBlog.mock.calls[0][0])
    expect(createNewBlog.mock.calls[0][0].title).toBe('Title Test' )
    expect(createNewBlog.mock.calls[0][0].author).toBe('Author Test' )
    expect(createNewBlog.mock.calls[0][0].url).toBe('Url Test' )
})