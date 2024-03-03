import React from 'react'
import { Button } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'
import MyModal from '../../components/MyModal/MyModal'

export default function CoursesModal({ show, setShow }) {

    const handleSave = () => {
        console.log("🍅 Saved");
    }
    const CourseType = [
        { value: "practical", label: "Practical" },
        { value: "theoretical", label: "Theoretical" }
    ]
    const SelectStage = [
        { value: "1", label: "First" },
        { value: "2", label: "Second" },
        { value: "3", label: "Third" },
        { value: "4", label: "Fourth" },
        { value: "5", label: "Fifth" },
    ]

    return (
        <MyModal show={show} setShow={setShow} title="Course" body={
            show === "delete" ?
                <h3>Are you sure?</h3>
                :
                <form className="d-flex flex-column gap-2">
                    <FormInput neme="id" type="text" label="id:" disabled={show === "show"} />
                    <FormInput neme="code" type="text" label="Code:" disabled={show === "show"} />
                    <FormInput neme="departments_id" type="text" label="Department_id:" disabled={show === "show"} />
                    <FormInput name="type" type="select" options={CourseType} label="Type:" disabled={show === "show"} />
                    <FormInput name="stage" type="select" options={SelectStage} label="Stage:" disabled={show === "show"} />
                    <FormInput neme="units"  type="text" label="Units:" disabled={show === "show"} />
                    <FormInput neme="duration_weeks" type="text" label="Duration (Weeks):" disabled={show === "show"} />
                    <FormInput neme="title_english" type="text" label="Title (English):" disabled={show === "show"} />
                    <FormInput neme="title_arabic" type="text" label="Title (Arabic):" disabled={show === "show"} />
                    <FormInput neme="language" type="text" label="Language of instruction:" disabled={show === "show"} />
                    <FormInput neme="year_of_study" type="text" label="Year of Study:" disabled={show === "show"} />
                    <FormInput neme="practical_marks" type="text" label="Course Work Marks (%):" disabled={show === "show"} />
                    <FormInput neme="theoretical_marks" type="text" label="Final Exam (%):" disabled={show === "show"} />
                    <FormInput neme="coordinator_name" type="text" label="Coordinator Name :" disabled={show === "show"} />
                    <FormInput neme="office_hours" type="text" label="Office Hours:" disabled={show === "show"} />
                    <FormInput neme="schedule" type="text" label="Schedule:" disabled={show === "show"} />
                    <FormInput neme="lecture_room" type="text" label="Lecture Room:" disabled={show === "show"} />
                    <FormInput neme="vertual_classroom" type="text" label="Virtual Classroom:" disabled={show === "show"} />
                    <FormInput neme="note" type="text" label="Note:" disabled={show === "show"} />
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
