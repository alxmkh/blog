import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [infoMessage, setInfoMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [isVisibleForm, setIsVisibleForm] = useState(false)

    useEffect(() => {
        blogService.getAll().then(blogs => {
            setBlogs(blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogApp')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addNote = (blogObject, author, title) => {
        blogService.create(blogObject).then(response => {
            setBlogs(blogs.concat(response))
            setInfoMessage(`a new blog ${title} by ${author}`)
            setIsVisibleForm(!isVisibleForm)
            setTimeout(() => {
                setInfoMessage(null)
            }, 5000)
        })
    }

    const showOrHideForm = () => {
        setIsVisibleForm(!isVisibleForm)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogApp', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            <Notification message={errorMessage} type={'error'}/>
            <div>
                username
                <input
                    id='username'
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id='password'
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button id='login-button' type="submit">login</button>
        </form>
    )

    const getLogout = () => {
        window.localStorage.removeItem('loggedBlogApp')
        setUser(null)
    }

    const updateLikes = (id, updatedObject) => {
        try {
            blogService.update(id, updatedObject).then((response) => {
                const index = blogs.findIndex(el => el.id === id)
                blogs[index].likes = response.likes;
                setBlogs(blogs.concat([]))
                // blogService.getAll().then(blogs =>
                //     setBlogs(blogs)
                // )
            })
        } catch (e) {
            console.error(e)
        }
    }

    const deleteBlog = (id) => {
        try {

            blogService.deleteBlog(id).then(() => {
                blogService.getAll().then(blogs =>
                    setBlogs(blogs)
                )
            })
        } catch (e) {
            console.error(e)
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

    return (
        <div>

            {user === null ?
                loginForm() :
                <div>
                    <h2>blogs</h2>
                    {infoMessage
                        ? <Notification message={infoMessage} type={'info'}/>
                        : null
                    }

                    <p>{user.name} logged in <button onClick={getLogout}>logout</button></p>
                    {
                        isVisibleForm
                            ? <NewBlogForm createNewBlog={addNote} setVisibleForm={showOrHideForm}/>
                            : <button onClick={setIsVisibleForm}>create new blog</button>
                    }
                    <div id='idDivElementForBlogList'>
                        {blogs.sort(compare).map(blog =>
                            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} login={user.name} deleteBlog={deleteBlog}/>
                        ).reverse()}
                    </div>

                </div>
            }
        </div>
    )
}

export default App