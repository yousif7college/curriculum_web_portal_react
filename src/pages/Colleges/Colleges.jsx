import React, { useState } from 'react'
import "./Colleges.scss"
import MyBanner from '../../components/MyBanner/MyBanner'
import coursesImg from '../../assets/images/homeBg.jpg'
import { Button, Container, Table } from 'react-bootstrap'
import CollegesModal from './CollegesModal'
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'
import { MdOutlineLaptopChromebook } from "react-icons/md";


export default function Colleges() {
    const [showModal, setShowModal] = useState(false)
    const headers = [
        "College_id",
        "College_name",
        "Created_at",
        "Updated_at",
        ""
    ]
    return (
        <div className='Colleges' >
            <MyBanner title="Colleges" img={coursesImg} icon={<MdOutlineLaptopChromebook />} />

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
            <CollegesModal show={showModal} setShow={setShowModal} />
        </div>
    )
}
