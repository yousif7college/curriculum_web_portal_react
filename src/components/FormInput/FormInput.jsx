import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import "./FormInput.scss"

export default function FormInput({ name, type, label, register, options, ...props }) {
    const formRegister = register ? register(name) : {};

    const getControl = (type) => {
        switch (type) {
            case "select":
                return (
                    <Form.Select {...props} {...formRegister}>
                        <option value="">Select {label}...</option>
                        {options?.map((item, i) =>
                            <option key={i} value={item?.value}>
                                {item?.label}
                            </option>
                        )}
                    </Form.Select>
                )
            default:
                return <Form.Control type={type} {...formRegister} {...props} />
        }
    }
    return (
        <InputGroup className="FormInput">
            <Form.Label>{label}:</Form.Label>
            {getControl(type)}
        </InputGroup>
    )
}
