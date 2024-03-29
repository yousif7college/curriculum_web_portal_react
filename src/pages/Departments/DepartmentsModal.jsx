import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'
import MyModal from '../../components/MyModal/MyModal'
import useHTTP from '../../hooks/useHTTP'
import { useForm } from 'react-hook-form'
import useOptions from '../../hooks/useOptions'

export default function DepartmentsModal({ show, setShow, selectedDepartment, refresh }) {

    const [sendHTTP, httpRes] = useHTTP();
    const getOptions = useOptions();

    const [colleges, setColleges] = useState([]);

    const { reset, register, handleSubmit } = useForm();

    const handleSave = async (data) => {
        if (show === "add") {
            sendHTTP('/departments', 'POST', data);
        } else if (show === "edit") {
            sendHTTP(`/departments/${selectedDepartment?.id}`, 'PUT', data);
        }
        console.log("🍅 Saved", data);
    }

    const handleDelete = (data) => {
        sendHTTP(`/departments/${data?.id}`, 'DELETE');
        console.log("🍅 Deleted", data?.id);
    }

    useEffect(() => {
        if (httpRes?.data) {
            setShow(false);
            refresh();
        }
    }, [httpRes?.data])

    useEffect(() => {
        if (show === "add") {
            reset({ name: "", college_id: "" })
        } else {
            reset(selectedDepartment)
        }
    }, [show])

    useEffect(() => {
        getOptions("/colleges").then((data) => setColleges(data));
    }, [])

    return (
        <MyModal show={show} setShow={setShow} title="Department" body={
            show === "delete" ?
                <h3>Are you sure?</h3>
                :
                <form className="d-flex flex-column gap-2">
                    <FormInput name="name" type="text" label="Department Name" register={register} disabled={show === "view"} />
                    <FormInput name="college_id" type="select" label="College" options={colleges} register={register} disabled={show === "view"} />
                </form>

        } footer={
            show === "delete" ?
                <>
                    <Button variant="secondary" onClick={() => setShow(false)}>No</Button>
                    <Button variant="danger" onClick={handleSubmit(handleDelete)}>Yes</Button>
                </>
                :
                <>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="success" onClick={handleSubmit(handleSave)}>Save</Button>
                </>
        } />
    )
}
