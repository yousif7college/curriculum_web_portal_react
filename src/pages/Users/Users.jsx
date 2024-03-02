import React, { useState } from 'react'
import "./Users.scss"
import MyBanner from '../../components/MyBanner/MyBanner'
import coursesImg from '../../assets/images/homeBg.jpg'
import { Button, Container, Table } from 'react-bootstrap'
import UsersModal from './UsersModal'
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'

export default function Users() {
    const [showModal, setShowModal] = useState(false)
    const headers = [
        "User_id",
        "First_name",
        "Last_name",
        "Email",
        "Password",
        "Edge",
        "Gender",
        "Note",
        "Created_at",
        "Updated_at",
        ""
    ]
    return (
        <div className='Users'>
            <MyBanner title="Users" img={coursesImg} />
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
                        <tr >
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div className="actionBtns">
                                    <Button variant="success" onClick={() => setShowModal("show")}><FaEye /></Button>
                                    <Button variant="primary" onClick={() => setShowModal("edit")}><FaPen /></Button>
                                    <Button variant="danger" onClick={() => setShowModal("delete")}><FaTrash /></Button>
                                </div>
                            </td>
                        </tr>
                        <tr >
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div className="actionBtns">
                                    <Button variant="success" onClick={() => setShowModal("show")}><FaEye /></Button>
                                    <Button variant="primary" onClick={() => setShowModal("edit")}><FaPen /></Button>
                                    <Button variant="danger" onClick={() => setShowModal("delete")}><FaTrash /></Button>
                                </div>
                            </td>
                        </tr>
                        <tr >
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div className="actionBtns">
                                    <Button variant="success" onClick={() => setShowModal("show")}><FaEye /></Button>
                                    <Button variant="primary" onClick={() => setShowModal("edit")}><FaPen /></Button>
                                    <Button variant="danger" onClick={() => setShowModal("delete")}><FaTrash /></Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <UsersModal show={showModal} setShow={setShowModal} />
        </div>
    )
}
