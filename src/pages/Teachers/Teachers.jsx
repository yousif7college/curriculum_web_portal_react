import React, { useEffect, useState } from 'react'
import "./Teachers.scss"
import MyBanner from '../../components/MyBanner/MyBanner'
import coursesImg from '../../assets/images/homeBg.jpg'
import { Button, Container, Table } from 'react-bootstrap'
import TeachersModal from './TeachersModal'
import { MdOutlineLaptopChromebook } from "react-icons/md";
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'
import useHTTP from '../../hooks/useHTTP'

export default function Teachers() {
    const [showModal, setShowModal] = useState(false)
    const headers = [
        "id",
        "First_name",
        "Last_name",
        "Email",
        "Phone_number",
        "Note",
        "Created_at",
        "Updated_at",
        ""
    ]
    const isLogin = localStorage.getItem('user')
    const [selectedTeacher, setSelectedTeacher] = useState({})

    const handleShowDelete = (teacher) => {
        setSelectedTeacher(teacher)
        setShowModal("delete")
    }

    const handleShowEdit = (teacher) => {
        setSelectedTeacher(teacher)
        setShowModal("edit")
    }

    const handleShowView = (teacher) => {
        setSelectedTeacher(teacher)
        setShowModal("view")
    }
    const handleEmailClick = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const [sendHTTP, httpRes] = useHTTP();
    useEffect(() => {
        document.title = "CWP - Teachers"
        refresh();
    }, [])

    function refresh() {
        sendHTTP('/teachers', 'GET');
    }
    return (
        <div className='Teachers' >
            <MyBanner title="Teachers" img={coursesImg} icon={<MdOutlineLaptopChromebook />} />

            <Container className="mt-5">
                <div className="mb-3 d-flex gap-2">
                    {isLogin && <Button variant="primary" onClick={() => setShowModal("add")}>Add</Button>}
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
                        {httpRes?.data && httpRes?.data?.data?.map((teacher, i) => {
                            return (
                                <tr key={i}>
                                    <td>{teacher.id}</td>
                                    <td>{teacher.first_name}</td>
                                    <td>{teacher.last_name}</td>
                                    <td>
                                        <a href="#" onClick={() => handleEmailClick(teacher.email)}>{teacher.email}</a>
                                    </td>
                                    <td>{teacher.phone_number}</td>
                                    <td>{teacher.note}</td>
                                    <td>{teacher.created_at}</td>
                                    <td>{teacher.updated_at}</td>
                                    <td>
                                        <div className="actionBtns">
                                            <Button variant="success" onClick={() => handleShowView(teacher)}><FaEye /></Button>
                                            {isLogin && <Button variant="primary" onClick={() => handleShowEdit(teacher)}><FaPen /></Button>}
                                            {isLogin && <Button variant="danger" onClick={() => handleShowDelete(teacher)}><FaTrash /></Button>}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
            <TeachersModal show={showModal} setShow={setShowModal} selectedTeacher={selectedTeacher} refresh={refresh} />
        </div>
    )
}
