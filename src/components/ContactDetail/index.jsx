import React, { useState, useEffect } from 'react';
import './style.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ContactDetail({contact, show, handleClose}) {
  console.log("contact", contact)
    function close() {
      handleClose();
    } 

    return (
        <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Person Information</Modal.Title>
          </Modal.Header>
          <Modal.Body as="section">
            {/* <div>
              {contact.first_name}
              {contact.phone}
            </div>
            <div>
              <div><label>Email</label><p>{contact.email[0]}</p></div>
 
            </div> */}
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}
