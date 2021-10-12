import React from "react";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Avatar from "../Avatar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function ContactDetail({ contact, show, handleClose }) {
  console.log("🚀 ~ file: index.jsx ~ line 12 ~ ContactDetail ~ contact", contact)
  const location = contact.Country ? 
    (contact['City/town/village/locality'] || contact['State/county']) + ", " + contact.Country 
    :
    ""
  return (
    <>
    {contact &&
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Person Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Avatar contact={contact}/>
          <h3 className="text-center">
            {contact.first_name} {contact.last_name}
          </h3>
          <p className="text-center primary-color">{contact.phone && contact.phone[0].value}</p>
          <hr />
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={contact.email[0].value}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Organization
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={contact.org_name}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Assistant
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={contact.name}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
              Groups
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={contact.Groups}
                />
              </Col>
            </Form.Group> 
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Location
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={location}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    }
    </>
  );
}
