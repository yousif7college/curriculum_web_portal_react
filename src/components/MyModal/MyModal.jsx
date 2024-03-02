import React from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'

export default function MyModal({ show, setShow, title,  body, footer, ...props }) {

    function capitalizeFirstLetter(string) {
        if (!string) return
        return string?.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Modal centered show={show} onHide={()=>setShow(false)} {...props}>
            <Modal.Header closeButton>
                <Modal.Title>{capitalizeFirstLetter(show)} {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                {footer}
            </Modal.Footer>
        </Modal>
    )
}
