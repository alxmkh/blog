import React, {useState} from 'react'
import Notification from './Notification'
import {userLoginAC} from '../reducers/LoginReducer'
import {initBlogsAC} from '../reducers/BlogReducer'
import {useDispatch, useSelector} from 'react-redux'

import {Col, Button} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const notification = useSelector(state => state.notification.notification)

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(userLoginAC(username, password))
        setUsername('')
        setPassword('')
        dispatch(initBlogsAC())
    }
    return <>
        <Alert variant="primary">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h2>Log in to application</h2>
                    <Notification message={notification} type={'error'}/>
                </Col>
            </Row>
            <Form onSubmit={handleLogin}>
                <Form.Group as={Row} className="mb-4"
                            controlId="validationUsername"
                            value={username} name='Username'
                            onChange={({target}) => setUsername(target.value)}>
                    <Form.Label column sm={3}>
                        Username
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="text" placeholder="input your username"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={3}>
                        Password
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="password" placeholder="input your password"
                                      value={password} name={'password'}
                                      onChange={({target}) => setPassword(target.value)}/>
                    </Col>
                </Form.Group>
                <Row className="justify-content-md-center">
                    <Col md='auto'>
                        <Button type="submit" id={'login-button'}>Login</Button>
                    </Col>
                </Row>
            </Form>
        </Alert>
    </>
}

export default LoginForm