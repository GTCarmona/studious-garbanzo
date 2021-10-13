import React from 'react'
import './style.css'

export default function Avatar({contact}) {
    const firstLetter = contact.first_name.charAt(0).toUpperCase();
    const secondLetter = contact.last_name.charAt(0).toUpperCase();
    return (
        <div className="d-flex align-items-center justify-content-center">

        {contact.picture_id ? 
                <img className="avatar" width="100" height="100" src="https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg" alt="avatar"/>
                :
                <div className="avatar default-avatar">
                    {firstLetter}{secondLetter}
                </div>
        }
        </div>
    )
}
