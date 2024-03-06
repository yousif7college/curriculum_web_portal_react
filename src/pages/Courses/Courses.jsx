import React, { useEffect, useState } from 'react'
import "./Courses.scss"
import MyBanner from '../../components/MyBanner/MyBanner'
import coursesImg from '../../assets/images/homeBg.jpg'
import { Button, Container, Table } from 'react-bootstrap'
import CoursesModal from './CoursesModal'
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'
import { BsBook } from "react-icons/bs";
import useHTTP from '../../hooks/useHTTP'

export default function Courses() {
    const [showModal, setShowModal] = useState(false)
    const headers = [
        "id",
        "Code",
        "Stage",
        "Title_english",
        "Title_arabic",
        "Language",
        "Coordinator_name",
        "Note",
        "Created_at",
        "Updated_at",
        ""
    ]

    const [selectedCourse, setSelectedCourse] = useState({})

    const handleShowDelete = (course) => {
        setSelectedCourse(course)
        setShowModal("delete")
    }

    const handleShowEdit = (course) => {
        setSelectedCourse(course)
        setShowModal("edit")
    }

    const handleShowView = (course) => {
        setSelectedCourse(course)
        setShowModal("view")
    }

    const [sendHTTP, httpRes] = useHTTP();
    useEffect(() => {
        document.title = "CWP - Courses"
        refresh();
    }, [])

    function refresh() {
        sendHTTP('/courses', 'GET');
    }


    return (
        <div className='Courses'>
            <MyBanner title="Courses" img={coursesImg} icon={<BsBook />} />
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
                        {httpRes?.data && httpRes?.data?.data?.map((course, i) => {
                            return (
                                <tr key={i}>
                                    <td>{course.id}</td>
                                    <td>{course.code}</td>
                                    <td>{course.stage}</td>
                                    <td>{course.title_english}</td>
                                    <td>{course.title_arabic}</td>
                                    <td>{course.language}</td>
                                    <td>{course.coordinator_name}</td>
                                    <td>{course.note}</td>
                                    <td>{course.created_at}</td>
                                    <td>{course.updated_at}</td>
                                    <td>
                                        <div className="actionBtns">
                                            <Button variant="success" onClick={() => handleShowView(course)}><FaEye /></Button>
                                            <Button variant="primary" onClick={() => handleShowEdit(course)}><FaPen /></Button>
                                            <Button variant="danger" onClick={() => handleShowDelete(course)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
            <CoursesModal show={showModal} setShow={setShowModal} selectedCourse={selectedCourse} refresh={refresh} />
        </div>
    )
}
