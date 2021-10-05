import React, { useState , useEffect} from 'react';
import ContactDetail from '../ContactDetail';
import './style.css'

export default function ContactCard(props) {
    const contact = props.contact;
    const [showModal, setShowModal] = useState(false);
    
    const closeModal = () => {
        console.log("close modal!")    
        setShowModal(current => !current)
        console.log("showModal after close button click", showModal)
    };
    const openModal = () => setShowModal(true);
    
    useEffect(() => {}, [showModal]);
    return (
        <div className="card" onClick={openModal}>
            <div>
                <p className="card_title">{contact.first_name}</p>
                <p className="card_subtitle">{contact.org_name}</p>
            </div>
            <div>
                {contact.picture_id && 
                    <img src={contact.picture_id} alt="" className="avatar_thumbnail" />
                }
            </div>
            {JSON.stringify(showModal)}
            {showModal && <ContactDetail show={showModal} handleClose={closeModal} contact={props.contact}/>}
        </div>
    )
}
