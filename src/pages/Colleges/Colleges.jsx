import React, { useEffect, useState } from 'react'
import "./Colleges.scss"
import MyBanner from '../../components/MyBanner/MyBanner'
import coursesImg from '../../assets/images/homeBg.jpg'
import { Button, Container, Table } from 'react-bootstrap'
import CollegesModal from './CollegesModal'
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'
import { MdOutlineLaptopChromebook } from "react-icons/md";
import useHTTP from '../../hooks/useHTTP'


export default function Colleges() {
    const [showModal, setShowModal] = useState(false)
    const headers = [
        "College_id",
        "College_name",
        "Created_at",
        "Updated_at",
        ""
    ]

    const [selectedCollege, setSelectedCollege] = useState({})

    const handleShowDelete = (college) => {
        setSelectedCollege(college)
        setShowModal("delete")
    }

    const handleShowEdit = (college) => {
        setSelectedCollege(college)
        setShowModal("edit")
    }

    const handleShowView = (college) => {
        setSelectedCollege(college)
        setShowModal("view")
    }

    const [sendHTTP, httpRes] = useHTTP();
    useEffect(() => {
        document.title = "CWP - Colleges"
        sendHTTP('/colleges', 'GET');
    }, [])

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
                        {httpRes?.loading && <tr><td colSpan="5">Loading...</td></tr>}
                        {httpRes?.error && <tr><td colSpan="5">Error Happened</td></tr>}
                        {httpRes?.data && httpRes?.data?.data?.map((college, i) => {
                            return (
                                <tr key={i}>
                                    <td>{college.id}</td>
                                    <td>{college.name}</td>
                                    <td>{college.created_at}</td>
                                    <td>{college.updated_at}</td>
                                    <td>
                                        <div className="actionBtns">
                                            <Button variant="success" onClick={() => handleShowView(college)}><FaEye /></Button>
                                            <Button variant="primary" onClick={() => handleShowEdit(college)}><FaPen /></Button>
                                            <Button variant="danger" onClick={() => handleShowDelete(college)}><FaTrash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
            <CollegesModal show={showModal} setShow={setShowModal} selectedCollege={selectedCollege} />
        </div>
    )
}
