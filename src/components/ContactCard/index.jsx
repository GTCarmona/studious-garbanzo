import React, { useState , useEffect} from 'react';
import ContactDetail from '../ContactDetail';
import './style.css'
import Avatar from '../Avatar'
import RemoveContact from '../RemoveContact';

export default function ContactCard(props) {
    const contact = props.contact;
    const [showModal, setShowModal] = useState(false);
    
    const closeModal = () => {
        setShowModal(current => !current)
    };
    const openModal = () => setShowModal(true);
    
    useEffect(() => {}, [showModal]);
    return (
        <>
        <div>
        <div className="card d-flex justify-content-between" onClick={openModal}>
            <div className="d-flex flex-column justify-content-between">
                <p className="card_title">{contact.first_name} {contact.last_name}</p>
                <p className="card_subtitle">{contact.org_name}</p>
            </div>
            <div className="d-flex">
                <Avatar contact={contact}/>
            </div>
        </div>
        <RemoveContact contact={contact} />
        </div>

            {showModal && 
                <ContactDetail 
                        show={showModal} 
                        handleClose={closeModal} 
                        contact={props.contact}/>}
            </>
    )
}
