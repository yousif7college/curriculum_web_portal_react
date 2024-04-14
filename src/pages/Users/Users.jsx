import React, { useEffect, useState } from 'react'
import "./Users.scss"
import MyBanner from '../../components/MyBanner/MyBanner'
import coursesImg from '../../assets/images/homeBg.jpg'
import { Button, Container, Table } from 'react-bootstrap'
import UsersModal from './UsersModal'
import { MdOutlineLaptopChromebook } from "react-icons/md";
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'
import useHTTP from '../../hooks/useHTTP'

export default function Users() {
    const [showModal, setShowModal] = useState(false)
    const headers = [
        "id",
        "First_name",
        "Last_name",
        "Email",
        "Password",
        "Edge",
        "Gender",
        "Created_at",
        "Updated_at",
        ""
    ]

    const [selectedUser, setSelectedUser] = useState({})

    const handleShowDelete = (user) => {
        setSelectedUser(user)
        setShowModal("delete")
    }

    const handleShowEdit = (user) => {
        setSelectedUser(user)
        setShowModal("edit")
    }

    const handleShowView = (user) => {
        setSelectedUser(user)
        setShowModal("view")
    }
    const handleEmailClick = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const [sendHTTP, httpRes] = useHTTP();
    useEffect(() => {
        document.title = "CWP - Users"
        refresh();
    }, [])

    function refresh() {
        sendHTTP('/users', 'GET');
    }
    return (
        <div className='Users' >
            <MyBanner title="Users" img={coursesImg} icon={<MdOutlineLaptopChromebook />} />

            <Container className="mt-5">
                <div className="mb-3 d-flex gap-2">
                    <Button variant="primary" onClick={() => setShowModal("add")}>Add</Button>
                </div>
                <Table striped bordered responsive hover>
                    <thead>
                        <tr>
                            {headers.map((header, i) => {
                                return <th key={i}>{header}</th>
                            })}

                        </tr>
                    </thead>
                    <tbody>
                        {httpRes?.loading && <tr><td colSpan="5">Loading...</td></tr>}
                        {httpRes?.error && <tr><td colSpan="5">Error Happened</td></tr>}
                        {httpRes?.data && httpRes?.data?.data?.map((user, i) => {
                            return (
                                <tr key={i}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>
                                        <a href="#" onClick={() => handleEmailClick(user.email)}>{user.email}</a>
                                    </td>
                                    <td>{user.password}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.created_at}</td>
                                    <td>{user.updated_at}</td>
                                    <td>
                                        <div className="actionBtns">
                                            <Button variant="success" onClick={() => handleShowView(user)}><FaEye /></Button>
                                            <Button variant="primary" onClick={() => handleShowEdit(user)}><FaPen /></Button>
                                            <Button variant="danger" onClick={() => handleShowDelete(user)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
            <UsersModal show={showModal} setShow={setShowModal} selectedUser={selectedUser} refresh={refresh} />
        </div>
    )
}
