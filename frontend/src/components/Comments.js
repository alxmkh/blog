import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux";
import {addCommentAC, initBlogsAC} from "../reducers/BlogReducer";

const Comments = ({comments, id}) => {
    const [newComment, setNewComment] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initBlogsAC())
    },[dispatch, comments])

    const changeComment = (event) => {
        setNewComment(event.target.value)
    }
    const addComment = () => {
        const comment = newComment
        dispatch(addCommentAC(id, {comment}))
        setNewComment('')
    }

    return <>
        <h2>Comments</h2>
        <div>
            <input
                type={'text'}
                value={newComment}
                placeholder={'Enter your comment'}
                onChange={changeComment}
            />
            <button onClick={addComment}>add comment</button>
        </div>
        {
            comments
                ? comments.map((comment, index) => <li key={index}>{comment}</li>)
                : null
        }
    </>
}

export default Comments