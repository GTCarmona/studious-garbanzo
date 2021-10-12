import React, { useState } from 'react';
import './style.css'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import api from "../../services/api";

export default function AddContactModal({show, handleClose, orgs, customFields, updateContactList}) {
  const groupKey = customFields.find(item => item.name === "Groups").key
  const assistantKey = customFields.find(item => item.name === "Assistant").key
  const [formData, setFormData] = useState({
    name: '',
    phone: [],
    email: [],
    org_id: 0,
    [groupKey] : "",
    [assistantKey]: ""

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
    console.log("formData", formData)
    api.addContact(formData)
      .then(response => updateContactList(response.data))
      .catch(error =>console.error(error))
      }

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body as="section">
            <Form>
              <Form.Group
                className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" name="name" onChange={handleChange} value={formData.name}  />
              </Form.Group>
              <Form.Group
                className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="phone" placeholder="Phone" onChange={handleEmailAndPhone} name="phone" />
              </Form.Group>
              <Form.Group
                className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={handleEmailAndPhone} name="email"/>
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
                <Form.Label>Assistant</Form.Label>
                <Form.Control type="text" placeholder="Assistant's Name" name={groupKey} />
              </Form.Group>
              <Form.Group
                className="mb-3">
                <Form.Label>Groups</Form.Label>
                <Form.Control type="text" placeholder="Group Name" name={assistantKey}/>
              </Form.Group>
              <Form.Group
                className="mb-3">
                {/* <Form.Label>Location</Form.Label>
                <Form.Control type="address" placeholder="Location" /> */}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-outline-secondary" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-primary primary-button" type="submit"  onClick={handleSubmit}>
              Add
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
}


