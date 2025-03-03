import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const ContactForm = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState(store.currentContact.name);
    const [phone, setPhone] = useState(store.currentContact.phone);
    const [email, setEmail] = useState(store.currentContact.email);
    const [address, setAddress] = useState(store.currentContact.address);
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
        event.preventDefault()
        actions.setCurrentContact({
            name,
            phone,
            email,
            address,
            id: store.currentContact.id
        })
        // todo: manage empty contact
        store.isEdit ? actions.updateContact() : actions.createContact();
        navigate('/contact')
    }
    return (
        <div >
            <PageTitle title={store.isEdit ? 'Edit Contact' : 'Create Contact'}/>
            <div className="col-10 col-sm-8 m-auto neon-box m-3 p-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nameId" className="form-label">Name</label>
                        <input onChange={(event) => setName(event.target.value)} value={name} type="text" className="form-control" id="nameId" placeholder="Name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneId" className="form-label">Phone</label>
                        <input onChange={(event) => setPhone(event.target.value)} value={phone} type="text" className="form-control" id="phoneId" placeholder="Phone" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emailId" className="form-label">Email</label>
                        <input onChange={(event) => setEmail(event.target.value)} value={email} type="text" className="form-control" id="emailId" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="addressId" className="form-label">Address</label>
                        <input onChange={(event) => setAddress(event.target.value)} value={address} type="text" className="form-control" id="addressId" placeholder="Address" />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
