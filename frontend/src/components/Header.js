import React from 'react'
import {resetUserAC} from "../reducers/LoginReducer"
import {useDispatch, useSelector} from "react-redux"

import {Container, Navbar} from 'react-bootstrap'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const getLogout = () => {
        dispatch(resetUserAC())
    }

    return <>
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">Menu</Navbar.Brand>
                <Nav className="me-auto">
                    <LinkContainer to="/users">
                        <Nav.Link href="#users">Users</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/blogs">
                        <Nav.Link href="#blogs">Blogs</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <Nav.Link href="/" onClick={getLogout}>{user.name} Logout?</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    </>
}

export default Header