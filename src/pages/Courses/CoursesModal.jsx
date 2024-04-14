import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'
import MyModal from '../../components/MyModal/MyModal'
import useHTTP from '../../hooks/useHTTP'
import { useForm } from 'react-hook-form'
import useOptions from '../../hooks/useOptions'

export default function CoursesModal({ show, setShow, selectedCourse, refresh }) {

    const [sendHTTP, httpRes] = useHTTP();
    const getOptions = useOptions();

    const [departments, setDepartments] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const { reset, register, handleSubmit } = useForm();

    const handleSave = async (data) => {
        if (show === "add") {
            sendHTTP('/courses', 'POST', data);
        } else if (show === "edit") {
            sendHTTP(`/courses/${selectedCourse?.id}`, 'PUT', data);
        }
        console.log("🍅 Saved", data);
    }

    const handleDelete = (data) => {
        sendHTTP(`/courses/${data?.id}`, 'DELETE');
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
            reset({ code: "", file_url: "",department_id: "", teacher_id: "", type: "theoretical", stage: "1", units: 0, duration_weeks: 0, title_english: "", title_arabic: "", language: "", year_of_study: 0, practical_marks: 0, theoretical_marks: 0, coordinator_name: "", office_hours: 0, schedule: new Date().toISOString().split('T')[0], lecture_room: "", virtual_classroom: "", note: "" })
        } else {
            reset(selectedCourse)
        }
    }, [show])

    useEffect(() => {
        getOptions("/departments").then((data) => setDepartments(data));
        getOptions("/teachers", "first_name").then((data) => setTeachers(data));
    }, [])

    return (
        <MyModal show={show} setShow={setShow} title="Course" body={
            show === "delete" ?
                <h3>Are you sure?</h3>
                :
                <form className="d-flex flex-column gap-2">
                    <FormInput name="code" type="text" label="Code" register={register} disabled={show === "view"} />
                    {show === "view"
                        ? <a href={selectedCourse?.file_url} target="_blank" rel="noreferrer">View File</a>
                        : <FormInput name="file_url" type="text" label="File URL" register={register} />}
                    <FormInput name="department_id" type="select" label="Department" options={departments} register={register} disabled={show === "view"} />
                    <FormInput name="teacher_id" type="select" label="Teacher" options={teachers} register={register} disabled={show === "view"} />
                    <FormInput name="type" type="select" options={getOptions("courseType")} label="Type" register={register} disabled={show === "view"} />
                    <FormInput name="stage" type="select" options={getOptions("stage")} label="Stage" register={register} disabled={show === "view"} />
                    <FormInput name="units" type="number" label="Units" register={register} disabled={show === "view"} />
                    <FormInput name="duration_weeks" type="text" label="Duration (Weeks)" register={register} disabled={show === "view"} />
                    <FormInput name="title_english" type="text" label="Title (English)" register={register} disabled={show === "view"} />
                    <FormInput name="title_arabic" type="text" label="Title (Arabic)" register={register} disabled={show === "view"} />
                    <FormInput name="language" type="text" label="Language of instruction" register={register} disabled={show === "view"} />
                    <FormInput name="year_of_study" type="text" label="Year of Study" register={register} disabled={show === "view"} />
                    <FormInput name="practical_marks" type="number" label="Course Work Marks (%)" register={register} disabled={show === "view"} />
                    <FormInput name="theoretical_marks" type="number" label="Final Exam (%)" register={register} disabled={show === "view"} />
                    <FormInput name="coordinator_name" type="text" label="Coordinator Name " register={register} disabled={show === "view"} />
                    <FormInput name="office_hours" type="number" label="Office Hours" register={register} disabled={show === "view"} />
                    <FormInput name="schedule" type="date" label="Schedule" register={register} disabled={show === "view"} />
                    <FormInput name="lecture_room" type="text" label="Lecture Room" register={register} disabled={show === "view"} />
                    <FormInput name="virtual_classroom" type="text" label="Virtual Classroom" register={register} disabled={show === "view"} />
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
