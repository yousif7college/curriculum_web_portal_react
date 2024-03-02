import React from 'react'
import { Button } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'
import MyModal from '../../components/MyModal/MyModal'

export default function CoursesModal({ show, setShow }) {

    const handleSave = () => {
        console.log("🍅 Saved");
    }
    const CourseType = [
        { value: "P", label: "Practical" },
        { value: "T", label: "Theoretical" }
    ]
    const SelectStage = [
        { value: "o", label: "First" },
        { value: "s", label: "Second" },
        { value: "t", label: "Third" },
        { value: "f", label: "Fourth" },
        { value: "F", label: "Fifth" }
    ]

    return (
        <MyModal show={show} setShow={setShow} title="Course" body={
            show === "delete" ?
                <h3>Are you sure?</h3>
                :
                <form className="d-flex flex-column gap-2">
                    <FormInput type="text" label="Couse Name Code:" disabled={show === "show"} />
                    <FormInput type="select" options={CourseType} label="CourseType:" disabled={show === "show"} />
                    <FormInput type="select" options={SelectStage} label="SelectStage:" disabled={show === "show"} />
                    <FormInput type="text" label="Units:" disabled={show === "show"} />
                    <FormInput type="text" label="Course Duration (Weeks):" disabled={show === "show"} />
                    <FormInput type="text" label="Course Title in English:" disabled={show === "show"} />
                    <FormInput type="text" label="Course Title in Arabic:" disabled={show === "show"} />
                    <FormInput type="text" label="Language of instruction:" disabled={show === "show"} />
                    <FormInput type="text" label="Year of Study:" disabled={show === "show"} />
                    <FormInput type="text" label="Course Work Marks (%):" disabled={show === "show"} />
                    <FormInput type="text" label="Final Exam (%):" disabled={show === "show"} />
                    <FormInput type="text" label="Course Coordinator :" disabled={show === "show"} />
                    <FormInput type="text" label="Office Hours:" disabled={show === "show"} />
                    <FormInput type="text" label="Course Schedule:" disabled={show === "show"} />
                    <FormInput type="text" label="Lecture Room:" disabled={show === "show"} />
                    <FormInput type="text" label="Virtual Classroom:" disabled={show === "show"} />
                    <FormInput type="text" label="Note:" disabled={show === "show"} />
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
