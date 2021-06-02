import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getAllUsersAC} from "../reducers/UsersReducer";
import {
    Link,
    useRouteMatch
} from "react-router-dom"
import User from "./User"
import Header from "./Header";
import {Row, Container, Table} from 'react-bootstrap'


const Users = () => {
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    const match = useRouteMatch('/users/:id')
    const currentUser = match
        ? users.find(user => user.id === match.params.id)
        : null

    useEffect(() => {
        dispatch(getAllUsersAC())
        // disable useEffect warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderUsers = () => {
        return users.map(user =>
            <ul key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link> <span>{user.blogs.length}</span>
            </ul>
        // <Table striped bordered hover size="sm">
        //     <thead>
        //     <tr>
        //         <th>User</th>
        //         <th>Blog's count</th>
        //     </tr>
        //     </thead>
        //     <tbody>
        //     <tr>
        //         <td>1</td>
        //         <td>Mark</td>
        //     </tr>
        //     <tr>
        //         <td>2</td>
        //         <td>Jacob</td>
        //     </tr>
        //     </tbody>
        // </Table>
        )
    }

    const LocalHeader = () => {
        return <>
            <Container>
                <Row className="justify-content-md-center pt-5">
                    {renderUsers()}
                </Row>
            </Container>
        </>
    }

    if (!user) {
        return null
    }

    return <>
        <Header/>
        {
            currentUser
            ? <User name={currentUser.name} blogs={currentUser.blogs}/>
            : LocalHeader()
        }
    </>
}


export default Users