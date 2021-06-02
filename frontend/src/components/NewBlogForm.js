import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {addBlogAC} from "../reducers/BlogReducer"
import {createNotificationAction} from "../reducers/NotificationReducer"
import {useDispatch} from "react-redux"

const NewBlogForm = ({setVisibleForm}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const showOrHideForm = () => {
        setVisibleForm(false)
    }

    const addNote = (event) => {
        event.preventDefault()
        dispatch(addBlogAC({
            title: title,
            author: author,
            url: url,
        }))
        dispatch(createNotificationAction(`a new blog ${title} by ${author}`,3000))
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNote}>
                <div>title: <input
                    id='title'
                    type='text'
                    value={title}
                    name='Title'
                    onChange={handleTitleChange}/></div>
                <div>author: <input
                    id='author'
                    type='text'
                    value={author}
                    name='Author'
                    onChange={handleAuthorChange}/></div>
                <div>url: <input
                    id='url'
                    type='text'
                    value={url}
                    name='Url'
                    onChange={handleUrlChange}/></div>
                <div>
                    <div>
                        <button id='button-create-blog' type='submit'>create</button>
                    </div>
                    <div>
                        <button onClick={showOrHideForm}>cancel</button>
                    </div>
                </div>
            </form>
        </>

    )
}

NewBlogForm.propTypes = {
    setVisibleForm: PropTypes.func.isRequired
}

export default NewBlogForm