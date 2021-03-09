import React, {useState} from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({createNewBlog, setVisibleForm}) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')


    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const showOrHideForm = () => {
        setVisibleForm(false)
    }

    const addNote = (event) => {
        event.preventDefault()
        createNewBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        }, newAuthor, newTitle)
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNote}>
                <div>title: <input
                    id='title'
                    type='text'
                    value={newTitle}
                    name='Title'
                    onChange={handleTitleChange}/></div>
                <div>author: <input
                    id='author'
                    type='text'
                    value={newAuthor}
                    name='Author'
                    onChange={handleAuthorChange}/></div>
                <div>url: <input
                    id='url'
                    type='text'
                    value={newUrl}
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
    setVisibleForm: PropTypes.func.isRequired,
    createNewBlog: PropTypes.func.isRequired,
}

export default NewBlogForm