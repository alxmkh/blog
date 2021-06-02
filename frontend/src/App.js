import React, {useState, useEffect} from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Users from './components/Users'
import Header from './components/Header'
import LoginForm from './components/LoginForm'

import {initBlogsAC} from './reducers/BlogReducer'
import {useDispatch, useSelector} from 'react-redux'
import {setUserAC} from './reducers/LoginReducer'
import {Button, Container, Row} from 'react-bootstrap'

import {
    Switch,
    Route,
    Redirect,
    useRouteMatch,
    Link,
} from 'react-router-dom'

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
}

const App = () => {

    const [isVisibleForm, setIsVisibleForm] = useState(false)

    const blogs = useSelector(state => state.blog)
    const notification = useSelector(state => state.notification.notification)
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    const match = useRouteMatch('/blogs/:id')

    const currentBlog = match
        ? blogs.find(blog => blog.id === match.params.id)
        : null

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogApp')
        if (loggedUserJSON) {
            dispatch(initBlogsAC())
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUserAC(user))
        }
        // disable useEffect warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showOrHideForm = () => {
        setIsVisibleForm(!isVisibleForm)
    }

    return (
        <Container>

            <Row className="justify-content-md-center pt-5">
                <Switch>
                    <Route path='/users'>
                        {user === null
                            ? <Redirect to='/'/>
                            : <Users/>
                        }
                    </Route>
                    <Route path='/'>
                        {user === null || user === ''
                            ? <LoginForm/>
                            : <div>
                                {notification
                                    ? <Notification message={notification} type={'info'}/>
                                    : null
                                }

                                {
                                    currentBlog
                                        ? <Blog key={currentBlog.id} blog={currentBlog} user={user}/>
                                        : <>
                                            <Header/>
                                            <div id='idDivElementForBlogList'>
                                                <h2>blogs</h2>
                                                {
                                                    isVisibleForm
                                                        ? <NewBlogForm setVisibleForm={showOrHideForm}/>
                                                        : <Button variant={'primary'} onClick={setIsVisibleForm}>create new
                                                            blog</Button>
                                                }
                                                {blogs.map(blog =>
                                                    <ul style={blogStyle} key={blog.id}>
                                                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                                    </ul>,
                                                )}
                                            </div>
                                        </>
                                }
                            </div>
                        }
                    </Route>
                </Switch>
            </Row>
        </Container>
)
}

export default App