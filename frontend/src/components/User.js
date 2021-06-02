import React from 'react'

const User = ({name, blogs}) => {
    return <>
        <h3>{name}</h3>
        <h4>Added blogs</h4>
        <div>
            {
                blogs.map(blog => <ul key={blog.id}>{blog.title}</ul>)
            }
        </div>
    </>
}

export default User