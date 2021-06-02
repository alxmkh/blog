import React from 'react'
import {initBlogsWithoutSortAC, voteForAC} from '../reducers/BlogReducer'
import {useDispatch} from 'react-redux'
import Header from './Header'
import Comments from './Comments'

const Blog = ({blog, user}) => {
    // const [isHidden, setIsHidden] = useState(false)
    // const [buttonName, setButtonName] = useState('view')

    const dispatch = useDispatch()

    // const delBlog = () => {
    //     const result = window.confirm(`Remove blog ${blog.title} ${blog.user.name}`);
    //     try {
    //         if (result) {
    //             dispatch(removeBlogAC(blog.id))
    //         }
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

    // const blogInfo = () => (
    //     <>
    //         <div>{blog.url}</div>
    //         <div id='idLikeDiv'><span> {blog.likes} </span>
    //             <button id='like-button' onClick={increaseLike}>like</button>
    //         </div>
    //         <div>{blog.user.name}</div>
    //         <div>
    //             {
    //                 login === blog.user.name
    //                     ? <button id='idDeleteBlogButton' onClick={delBlog}>remove</button>
    //                     : ''
    //             }
    //
    //         </div>
    //     </>
    // )

    const increaseLike = () => {
        try {
            const updatedObject = {
                user: blog.user.id,
                likes: blog.likes + 1,
                author: blog.user.name,
                title: blog.title,
                url: blog.url,
            }
            dispatch(voteForAC(blog.id, updatedObject))
            dispatch(initBlogsWithoutSortAC())
        } catch (e) {
            console.error(e)
        }
    }

    // const changeHidden = () => {
    //     setIsHidden(!isHidden)
    //     setButtonName(buttonName === 'hidden' ? 'view' : 'hidden')
    // }

    if (!blog) {
        return null
    }

    return (
        <>
            {/*<div style={blogStyle}>*/}
            {/*{blog.title} {blog.author} {<button id='view-hidden-button' onClick={changeHidden}>*/}
            {/*{buttonName}*/}
            {/*</button>}*/}
            {/*{*/}
            {/*    isHidden*/}
            {/*        ? blogInfo()*/}
            {/*        : ''*/}
            {/*}*/}
            {/*</div>*/}
            <Header/>
            <h2>{blog.title}</h2>
            <div><a href="#">{blog.url}</a></div>
            <div>{blog.likes} likes <button id='like-button' onClick={increaseLike}>like</button></div>
            <div>added by {blog.author}</div>
            <Comments comments={blog.comments} id={blog.id}/>
        </>
    )
}

export default Blog
