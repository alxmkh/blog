import React, {useState} from 'react'
import PropTypes from "prop-types";
import NewBlogForm from "./NewBlogForm";

const Blog = ({blog, updateLikes, login, deleteBlog}) => {
    const [isHidden, setIsHidden] = useState(false)
    const [buttonName, setButtonName] = useState('view')
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const delBlog = () => {
        const result = window.confirm(`Remove blog ${blog.title} ${blog.user.name}`);
        if (result) {
            deleteBlog(blog.id)
        }

    }

    const blogInfo = () => (
        <>
            <div>{blog.url}</div>
            <div id='idLikeDiv'><span> {blog.likes} </span><button id='like-button' onClick={increaseLike}>like</button></div>
            <div>{blog.user.name}</div>
            <div>
                {
                    login === blog.user.name
                    ? <button id='idDeleteBlogButton' onClick={delBlog}>remove</button>
                    : ''
                }

            </div>
        </>
    )

    const increaseLike = () => {
        const updatedObject = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.user.name,
            title: blog.title,
            url: blog.url
        }
        updateLikes(blog.id, updatedObject)

    }

    const changeHidden = () => {
        setIsHidden(!isHidden)
        setButtonName(buttonName === 'hidden' ? 'view' : 'hidden')
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author} {<button id='view-hidden-button' onClick={changeHidden}>{buttonName}</button>}
            {
                isHidden
                    ? blogInfo()
                    : ''
            }
        </div>
    )
}

NewBlogForm.propTypes = {
    updateLikes: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    login: PropTypes.string.isRequired,
    blog: PropTypes.object.isRequired,
}

export default Blog
