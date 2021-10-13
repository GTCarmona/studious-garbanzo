import React, { useState } from 'react';
import './style.css'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from "../../services/api";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function AddContactModal({show, handleClose, orgs, contactFields, updateContactList}) {
  const [showAlert, setShowAlert] = useState(false);

  /* Select the Custom Fields I need for creation */
  const groupKey = contactFields.find(item => item.name === "Groups").key
  const assistantKey = contactFields.find(item => item.name === "Assistant").key
  const locationKey = contactFields.find(item => item.name === "Location").key
  const [formData, setFormData] = useState({
    name: '',
    phone: [],
    email: [],
    org_id: 0,
    [groupKey] : "",
    [assistantKey]: "",
    [locationKey]: null
  })
  const handleEmailAndPhone = (e) => {
    setFormData({
        ...formData,
      [e.target.name]: [{label: 'work', value: e.target.value, primary: true}] })
  }

  const handleChange = (e) => {
    setFormData({
        ...formData,
      [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
      api.addContact(formData)
      .then(response => {
        updateContactList(response.data)
        handleClose();
        triggerAlert();
      })
      .catch(error => console.error(error))
  }
    const handleSetLocation = (response) => {
      /* NOT WORKING => the new data does not get stored properly on API (format not matching ?)  */
      setFormData({...formData,
        [locationKey]: response.value 
      })
      }
      const triggerAlert = () => {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 4000);
      }

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body as="section">
            <Form>
              <Row>
                <Form.Group as={Col} md="6"
                  className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control required type="text" placeholder="Name" name="name" onChange={handleChange} value={formData.name}  />
                </Form.Group>
                <Form.Group as={Col} md="6"
                  className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control required type="phone" placeholder="Phone" onChange={handleEmailAndPhone} name="phone" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6"
                  className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control required type="email" placeholder="name@example.com" onChange={handleEmailAndPhone} name="email"/>
                </Form.Group>
                <Form.Group as={Col} md="6"
                  className="mb-3">
                  <Form.Label>Assistant</Form.Label>
                  <Form.Control required type="text" placeholder="Assistant's Name" name={assistantKey} onChange={handleChange} />
                </Form.Group>
              </Row>
              <Form.Group
                className="mb-3">
                <Form.Label>Groups</Form.Label>
                <Form.Control required type="text" placeholder="Group Name"  name={groupKey}  onChange={handleChange} />
              </Form.Group>
              <Form.Group
                className="mb-3">
                <Form.Label>Organization</Form.Label>
                <Form.Select className="mb-3" id="inlineFormCustomSelect" onChange={handleChange} name="org_id">
                  <option value="0">Choose...</option>
                  {orgs && orgs.map(orgItem => (
                    <option key={orgItem.id} value={orgItem.id}>{orgItem.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3">
                <Form.Label>Location</Form.Label>
                <GooglePlacesAutocomplete
                   apiKey={GOOGLE_API_KEY}
                   selectProps={{
                    onChange: handleSetLocation,
                  }}
                 />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary"  onClick={handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        {showAlert && 
        <Alert className="alert" variant="success" onClose={() => setShowAlert(false)} dismissible>
         {formData.name} was created successfully!
        </Alert>
      }
      </>
    );
}


