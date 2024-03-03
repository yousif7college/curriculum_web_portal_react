import React from 'react'
import { Button } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'
import MyModal from '../../components/MyModal/MyModal'

export default function UsersModal({ show, setShow }) {

    const handleSave = () => {
        console.log("🍅 Saved");
    }

    return (
        <MyModal show={show} setShow={setShow} title="Users" body={
            show === "delete" ?
                <h3>Are you sure?</h3>
                :
                <form className="d-flex flex-column gap-2">
                    <FormInput name="id" type="text" label="User_id:" disabled={show === "show"} />
                    <FormInput name="first_name" type="text" label="First_name:" disabled={show === "show"} />
                    <FormInput name="last_name" type="text" label="Last_name:" disabled={show === "show"} />
                    <FormInput name="email" type="text" label="Email:" disabled={show === "show"} />
                    <FormInput name="password" type="text" label="Password:" disabled={show === "show"} />
                    <FormInput name="age" type="text" label="Age:" disabled={show === "show"} />
                    <FormInput name="gender" type="text" label="Gender:" disabled={show === "show"} />
                    <FormInput name="gender" type="text" label="Note:" disabled={show === "show"} />
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
