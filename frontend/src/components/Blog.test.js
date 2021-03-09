import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Title',
        author: 'Author',
        url: 'url',
        likes: 1
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Title Author'
    )

    expect(component.container).not.toHaveTextContent(
        'url 1'
    )
})

test('clicking the button can show url and number of likes', () => {
    const blog = {
        title: 'Title',
        author: 'Author',
        url: 'url',
        likes: 1,
        user: 'Ivan'
    }

    const component = render(
        <Blog blog={blog}/>
    )

    expect(component.container).not.toHaveTextContent(
        'hiddenurl1 likeremove'
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'hiddenurl1 likeremove'
    )
})

test('clicking like button twice', () => {
    const blog = {
        title: 'Title',
        author: 'Author',
        url: 'url',
        likes: 1,
        user: 'Ivan'
    }
    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} updateLikes={mockHandler}/>
    )
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)
    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)
    expect(mockHandler.mock.calls).toHaveLength(2)
})
