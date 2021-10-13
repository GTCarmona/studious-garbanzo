import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import api from "../../services/api";
import './style.css';

export default function RemoveContact({contact, removeFromContactList}) {
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [deletedName, setDeletedName] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRemoval = () => {
        api.removeContact(contact.id)
            .then((response) => {
              removeFromContactList(response.data.id)
                setShow(false);
                triggerAlert(contact)
            })
    }
    const triggerAlert = (contact) => {
    setDeletedName(contact.first_name + " " + contact.last_name)
    setShowAlert(true)
      setInterval(() => {
        setShowAlert(false)
      }, 4000);
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
      {showAlert && 
        <Alert className="alert"  onClose={() => setShowAlert(false)} dismissible>
          The contact {deletedName} was removed!
        </Alert>
      }
        </>
    )
}
