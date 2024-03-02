import React from 'react'
import { Button } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'
import MyModal from '../../components/MyModal/MyModal'





export default function CollegesModal({ show, setShow }) {

    const handleSave = () => {
        console.log("🍅 Saved");
    }

    return (
        <MyModal show={show}  setShow={setShow}  title="College" body={
            show === "delete" ?
                <h3>Are you sure?</h3>
                :
                <form className="d-flex flex-column gap-2">
                    <FormInput type="text" label="College_id:" disabled={show === "show"} />
                    <FormInput type="text" label="College_name:" disabled={show === "show"} />
                    <FormInput type="text" label="Unevirsity_id" disabled={show === "show"} />
                    <FormInput type="text" label="Creted_at:" disabled={show === "show"} />
                    <FormInput type="text" label="Updated_at:" disabled={show === "show"} />
                </form>

        } footer={
            show === "delete" ?
                <>
                    <Button variant="secondary" onClick={() => setShow(false)}>No</Button>
                    <Button variant="danger" onClick={handleSave}>Yes</Button>
                </>
                :
                <>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="success" onClick={handleSave}>Save</Button>
                </>
        } />
    )
}
