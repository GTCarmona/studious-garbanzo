import React, { useState, useEffect } from 'react';
import getContacts from "../../services/api";
import ContactCard from '../ContactCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await getContacts(); 
                setContacts(response.data);
        }
        fetchData();
    }, [])
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
    return (
        <div className="main">
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <h1>Peoples List</h1>
                </div>
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
                                        <div ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps}>
                                        <ContactCard  contact={item} />
                                        </div>)}
                            </Draggable>
                            ))
                        }
                    </div>)}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
