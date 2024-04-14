import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'
import MyModal from '../../components/MyModal/MyModal'
import useHTTP from '../../hooks/useHTTP';
import { useForm } from 'react-hook-form';

export default function TeachersModal({ show, setShow, selectedTeacher, refresh }) {

    const [sendHTTP, httpRes] = useHTTP();

    const { reset, register, handleSubmit } = useForm();

    const handleSave = async (data) => {
        if (show === "add") {
            sendHTTP('/teachers', 'POST', data);
        } else if (show === "edit") {
            sendHTTP(`/teachers/${selectedTeacher?.id}`, 'PUT', data);
        }
        console.log("🍅 Saved", data);
    }

    const handleDelete = (data) => {
        sendHTTP(`/teachers/${data?.id}`, 'DELETE');
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
            reset({ first_name: "", last_name: "", email: "", phone_number: "", note: "" })
        } else {
            reset(selectedTeacher)
        }
    }, [show])

    return (
        <MyModal show={show} setShow={setShow} title="Teachers" body={
            show === "delete" ?
                <h3>Are you sure?</h3>
                :
                <form className="d-flex flex-column gap-2">
                    <FormInput name="first_name" type="text" label="First_name" register={register} disabled={show === "view"} />
                    <FormInput name="last_name" type="text" label="Last_name" register={register} disabled={show === "view"} />
                    <FormInput name="email" type="email" label="Email" register={register} disabled={show === "view"}/>
                    <FormInput name="phone_number" type="number" label="Phone_number" register={register} disabled={show === "view"} />
                    <FormInput name="note" type="text" label="Note" register={register} disabled={show === "view"} />
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
