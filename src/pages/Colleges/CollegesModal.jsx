import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'
import MyModal from '../../components/MyModal/MyModal'
import useHTTP from '../../hooks/useHTTP';





export default function CollegesModal({ show, setShow, selectedCollege }) {

    const [sendHTTP, httpRes] = useHTTP();

    const handleSave = async () => {
        if (show === "add") {
            sendHTTP('/colleges', 'POST', { name: document.querySelector("#name").value });
        }
        else if (show === "edit") {
            sendHTTP(`/colleges/${selectedCollege?.id}`, 'PUT', { name: document.querySelector("#name").value });
        }
        console.log("🍅 Saved", document.querySelector("#name").value);
    }

    const handleDelete = () => {
        sendHTTP(`/colleges/${selectedCollege?.id}`, 'DELETE');
        console.log("🍅 Deleted");
    }

    useEffect(() => {
        if (httpRes?.data) {
            setShow(false);
        }
    }, [httpRes?.data])

    useEffect(() => {
        if (show === "add") {
            document.querySelector("#name").value = "";
        }
        else if (show === "edit" || show === "view") {
            document.querySelector("#name").value = selectedCollege?.name;
        }
    }, [show])

    return (
        <MyModal show={show} setShow={setShow} title="College" body={
            show === "delete" ?
                <h3>Are you sure?</h3>
                :
                <form className="d-flex flex-column gap-2">
                    <FormInput id="name" name="name" type="text" label="College Name:" disabled={show === "view"} />
                </form>

        } footer={
            show === "delete" ?
                <>
                    <Button variant="secondary" onClick={() => setShow(false)}>No</Button>
                    <Button variant="danger" onClick={handleDelete}>Yes</Button>
                </>
                :
                <>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="success" onClick={handleSave}>Save</Button>
                </>
        } />
    )
}
