import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import ContactCard from '../ContactCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';
import AddContactModal from '../AddContactModal';
const CUSTOM_FIELD_LENGTH = 30

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customFields, setCustomFields] = useState([]);



    const fetchContacts = async () => {
        const contactsResponse = await api.getContacts(); 
        const contactFields = await api.getContactFields(); 
        const mapped = contactsResponse.data.map(item => {
            let customFields = [];
            Object.entries(item).forEach(function([key, value]) {
                const customFieldKey = contactFields.data.find(contactField => {return key.length > CUSTOM_FIELD_LENGTH && contactField.key === key})
                if(customFieldKey ) {
                    let customFieldKeyValue= customFieldKey.name
                    const customField = {
                        [customFieldKeyValue] : value
                    }
                    customFields.push(customField);
                }
            })
            const finalCustomFields = Object.assign({}, ...customFields);
                return {
                    ...finalCustomFields,
                    ...item
                }
            })
            setContacts(mapped);
            setCustomFields(contactFields.data)
    }
    const fetchOrgs = async () => {
        const orgsResponse = await api.getOrgs();
        setOrgs(orgsResponse.data)
    }

    const toggleShowForm = () => {
        setShowForm(!showForm)
    }

    const onDragEnd = (result) => {
        const {destination, source, reason} = result;
        if(!destination || reason === "CANCEL") {
            return;
        };
        if(destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        };
        const draggedContacts = [...contacts];
        const droppedUser = contacts[source.index];

        draggedContacts.splice(source.index,1);
        draggedContacts.splice(destination.index,0,droppedUser);


        setContacts(draggedContacts)
    }

    useEffect(() => {
        fetchContacts()
    }, [contacts])
    
    useEffect(() => {
        fetchOrgs();
    }, [])

    console.log("contacts", contacts)
    return (
        <div className="main">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="d-flex justify-content-between pt-4 pb-4">
                    <h1>Peoples List</h1>
                    <button className="btn btn-primary primary-button" onClick={toggleShowForm}>+ Add new contact</button>
                </div>
                <hr />
                <Droppable droppableId="dp1" >
                    {(provided) => (
                    <div className="contentWrapper" ref={provided.innerRef} {...provided.droppableProps}>
                        {contacts && 
                            contacts.map((item, index) => (
                            <Draggable 
                                key={index + 1} 
                                draggableId={index+''} 
                                index={index}>
                                    {(provided) => (
                                        <div className="card-wrapper" 
                                        ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps}>
                                        <ContactCard contact={item} />
                                        </div>)}
                            </Draggable>
                            ))
                        }
                    </div>)}
                </Droppable>
            </DragDropContext>
            {showForm && <AddContactModal 
                orgs={orgs} 
                show={showForm} 
                handleClose={toggleShowForm} 
                customFields={customFields} />}
        </div>
    )
}
