import blogsServices from '../services/blogs'

const blogReducer = (state=[], action) => {
    switch (action.type) {
        case 'INIT_BLOGS_WITHOUT_SORT':
            return action.data
        case 'INIT_BLOGS':
            return action.data.sort(compare).map(blog => blog).reverse()
            //return action.data
        case 'ADD_BLOG':
            const sortedBlogs = state.sort(compare).map(blog => blog).reverse()
            return [...sortedBlogs, action.data]
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.id)
        case 'LIKE_BLOG':
            const currentBlog = state.find(blog => blog.id === action.data.id)
            return state.map(blog =>
                blog.id !== action.data.id ? blog : currentBlog
            )
        case 'ADD_COMMENT':
            const cur = state.find(blog => blog.id === action.data.id)
            return state.map(blog =>
                blog.id !== action.data.id ? blog : cur
            )
        default:
            return state
    }
}

export const addCommentAC = (id, comment) => {
    return async dispatch => {
        const blog = await blogsServices.addCommentToBlog(id, comment)
        dispatch({
            type: 'ADD_COMMENT',
            data: blog
        })
    }
}

export const initBlogsAC = () => {
    return async dispatch => {
        const blogs = await blogsServices.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const initBlogsWithoutSortAC = () => {
    return async dispatch => {
        const blogs = await blogsServices.getAll()
        dispatch({
            type: 'INIT_BLOGS_WITHOUT_SORT',
            data: blogs
        })
    }
}

export  const addBlogAC = (data) => {
    return async dispatch => {
        const blog = await blogsServices.create(data)
        dispatch({
            type: 'ADD_BLOG',
            data: blog
        })
    }
}

export const removeBlogAC = (id) => {
    return async dispatch => {
        await blogsServices.deleteBlog(id)
        dispatch({
            type: 'REMOVE_BLOG',
            id: id
        })
    }
}

export const voteForAC = (object, id) => {
    return async  dispatch => {
        const blog = await  blogsServices.update(object, id)
        dispatch({
            type: 'LIKE_BLOG',
            data: blog
        })
    }
}

const compare = (a, b) => {
    let comparison = 1;
    if (a.likes > b.likes) {
        comparison = 0;
    } else if (a.likes < b.likes) {
        comparison = -1;
    }
    return comparison;
}

export default blogReducer