import React, { useEffect, useState } from 'react'
import "./Departments.scss"
import MyBanner from '../../components/MyBanner/MyBanner'
import coursesImg from '../../assets/images/homeBg.jpg'
import { Button, Container, Table } from 'react-bootstrap'
import DepartmentsModal from './DepartmentsModal'
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'
import useHTTP from '../../hooks/useHTTP'

export default function Departments() {
    const [showModal, setShowModal] = useState(false)
    const headers = [
        "Department_id",
        "Department_name",
        "College_id",
        "Created_at",
        "Updated_at",
        ""
    ]

    const [selectedDepartment, setSelectedDepartment] = useState({})

    const handleShowDelete = (department) => {
        setSelectedDepartment(department)
        setShowModal("delete")
    }

    const handleShowEdit = (department) => {
        setSelectedDepartment(department)
        setShowModal("edit")
    }

    const handleShowView = (department) => {
        setSelectedDepartment(department)
        setShowModal("view")
    }

    const [sendHTTP, httpRes] = useHTTP();
    useEffect(() => {
        document.title = "CWP - Departments"
        refresh();
    }, [])

    function refresh() {
        sendHTTP('/departments', 'GET');
    }

    return (
        <div className='Departments'>
            <MyBanner title="Dapartments" img={coursesImg} />
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
                        {httpRes?.data && httpRes?.data?.data?.map((department, i) => {
                            return (
                                <tr key={i}>
                                    <td>{department.id}</td>
                                    <td>{department.name}</td>
                                    <td>{department.college_id}</td>
                                    <td>{department.created_at}</td>
                                    <td>{department.updated_at}</td>
                                    <td>
                                        <div className="actionBtns">
                                            <Button variant="success" onClick={() => handleShowView(department)}><FaEye /></Button>
                                            <Button variant="primary" onClick={() => handleShowEdit(department)}><FaPen /></Button>
                                            <Button variant="danger" onClick={() => handleShowDelete(department)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
            <DepartmentsModal show={showModal} setShow={setShowModal} selectedDepartment={selectedDepartment} refresh={refresh} />
        </div>
    )
}
