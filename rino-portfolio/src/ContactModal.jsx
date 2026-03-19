import React, {useState} from 'react'

function ContactModal(props){

    if(!props.isOpen) return null;

    return(
        <div className="modal-overlay" onClick={props.onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="mono-text">
                        Contact Me
                    </h2>
                    <button className="close-btn" onClick={props.onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    </button>
                </div>

                <form className="contact-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder='email@example.com'/>
                    </div>
                    <div className='form-group'>
                        <label>Message</label>
                        <textarea rows="4" placeholder='...'></textarea>
                    </div>
                    <button type="submit" className='submit-btn'>Send Message</button>
                </form>
            </div>
        </div>
    )
}
export default ContactModal