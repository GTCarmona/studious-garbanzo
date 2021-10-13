import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import ContactCard from '../ContactCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';
import AddContactModal from '../AddContactModal';
/* use this to define what is a custom field, ideally would have some different flag */
const CUSTOM_FIELD_LENGTH = 30

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [contactFields, setContactFields] = useState([]);

    const [filterName, setFilterName] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);
    /* Update the contact array after removing from the database */
    const removeFromContactList = (id) => {
        const newContactsList = contacts.filter((contact) =>  contact.id !== id)
        setContacts(newContactsList);
    };
    /* Update contact list after creating a new contact, and puts the new contact as first of list */
    const updateContactList = (data) => {
        const updatedContacts = [...contacts]
        updatedContacts.unshift(data)
        const mappedContacts = mapFields(updatedContacts, contactFields)
        setContacts(mappedContacts);

    };
    /* Retrieve orgs data for selection when creating a new contact */
    const fetchOrgs = async () => {
        const orgsResponse = await api.getOrgs(); 
        setOrgs(orgsResponse.data)

    };
    /* Map the custom fields into the contacts array to remove unrecognizeble custom keys  */
    /* We use this for each contact and then again after contact creation */
    const mapFields = (contactsArray, contactFields) => {
        const mapped = contactsArray.map(item => {
            let customFields = [];
            Object.entries(item).forEach(function([key, value]) {
                const customFieldKey = contactFields.find(contactField => {return key.length > CUSTOM_FIELD_LENGTH && contactField.key === key})
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
        return mapped;
    }
    const fetchContacts = async () => {
            const contactsResponse = await api.getContacts(); 
            const contactFieldsResponse = await api.getContactFields(); 
            setContactFields(contactFieldsResponse.data)
            const mappedContacts = mapFields(contactsResponse.data, contactFieldsResponse.data)
            setContacts(mappedContacts)
            setFilteredContacts(mappedContacts)
    }

    useEffect(() => {
        fetchOrgs();
    }, [])
    useEffect(() => {
        fetchContacts();
    }, [])

    const toggleShowForm = () => {
        setShowForm(!showForm)
    }
    /* logic for usage of react-beautiful-dnd to make the drag and drop of cards */
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
    const filter = (e) => {
        const keyword = e.target.value;
    
        if (keyword !== '') {
          const results = contacts.filter((user) => {
            return user.name.toLowerCase().startsWith(keyword.toLowerCase());
          });
          setFilteredContacts(results);
        } else {
          setFilteredContacts(contacts);
        }
    
        setFilterName(keyword);
      };
    return (
        <div className="main">
            <DragDropContext onDragEnd={onDragEnd}>
                <h1 className="mt-4">Peoples List</h1>
                <div className="d-flex flex-wrap justify-content-between pt-4">
                    <div class="search-input col-md-4 col-12 mb-3">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkslategray" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </span>
                        <input
                          type="search"
                          value={filterName}
                          onChange={filter}
                          className="input"
                          placeholder="Filter by name"
                          />
                    </div>
                    <button className="btn btn-primary primary-button col-md-3 col-12 mb-3" onClick={toggleShowForm}>+ Add new contact</button>
                </div>
                <hr />
                <Droppable droppableId="dp1" >
                    {(provided) => (
                    <div className="contentWrapper" ref={provided.innerRef} {...provided.droppableProps}>
                        {filteredContacts && 
                            filteredContacts.map((item, index) => (
                            <Draggable 
                                key={index + 1} 
                                draggableId={index+''} 
                                index={index}>
                                    {(provided) => (
                                        <div className="card-wrapper" 
                                        ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps}>
                                        <ContactCard contact={item} removeFromContactList={removeFromContactList} />
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
                            updateContactList={updateContactList}
                            contactFields={contactFields} />}
        </div>
    )
}
