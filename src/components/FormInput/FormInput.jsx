import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import "./FormInput.scss"

export default function FormInput({ type, label, options, ...props }) {
    const getControl = (type) => {
        switch (type) {
            case "select":
                return (
                    <Form.Select {...props}>
                        {options?.map((item, i) =>
                            <option key={i} value={item?.value}>
                                {console.log("ddd", item)}
                                {item?.label}
                            </option>
                        )}
                    </Form.Select>
                )
            default:
                return <Form.Control type={type}  {...props} />
        }
    }
    return (
        <InputGroup className="FormInput">
            <Form.Label>{label}</Form.Label>
            {getControl(type)}
        </InputGroup>
    )
}
