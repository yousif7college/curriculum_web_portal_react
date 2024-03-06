import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'
import MyModal from '../../components/MyModal/MyModal'
import useHTTP from '../../hooks/useHTTP';
import { useForm } from 'react-hook-form';





export default function CollegesModal({ show, setShow, selectedCollege, refresh }) {

    const [sendHTTP, httpRes] = useHTTP();

    const { reset, register, handleSubmit } = useForm();

    const handleSave = async (data) => {
        if (show === "add") {
            sendHTTP('/colleges', 'POST', data);
        } else if (show === "edit") {
            sendHTTP(`/colleges/${selectedCollege?.id}`, 'PUT', data);
        }
        console.log("🍅 Saved", data);
    }

    const handleDelete = (data) => {
        sendHTTP(`/colleges/${data?.id}`, 'DELETE');
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
            reset({ name: "" })
        } else {
            reset(selectedCollege)
        }
    }, [show])

    return (
        <MyModal show={show} setShow={setShow} title="College" body={
            show === "delete" ?
                <h3>Are you sure?</h3>
                :
                <form className="d-flex flex-column gap-2">
                    <FormInput name="name" type="text" label="College Name" register={register} disabled={show === "view"} />
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
