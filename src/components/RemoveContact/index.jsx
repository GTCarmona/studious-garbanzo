import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from "../../services/api";
import './style.css';

export default function RemoveContact({contact, removeFromContactList}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRemoval = () => {
        api.removeContact(contact.id)
            .then((data) => {
                removeFromContactList(data.data.id);
                setShow(false);
            })
    }
    return (
        <>
        <div className="position-relative">
            <button className="btn-close custom_btn-close" onClick={handleShow}></button>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove {contact.first_name} {contact.last_name} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRemoval}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
