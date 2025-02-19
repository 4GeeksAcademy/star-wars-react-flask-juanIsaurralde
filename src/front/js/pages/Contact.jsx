import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../component/PageTitle.jsx";

export const Contact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const newContact = () => {
        actions.setCurrentContact({
            "name": "",
            "phone": "",
            "email": "",
            "address": "",
            "id": ""
        });
        actions.setIsEdit(false)
        navigate('new')
    }
    const handleEdit = (contact) => {
        actions.setCurrentContact(contact);
        actions.setIsEdit(true)
        navigate('edit')
    }
    const handleDelete = contactID => actions.deleteContact(contactID)

    const getImageId = (contactId) => {
        return contactId > 100 ? contactId % 10 + Math.floor((contactId % 100) / 10) : contactId
    }

    return (
        <div className="mx-5">
            <div>
                <PageTitle title="Contact List" />
                <span className="btn btn-primary" onClick={newContact}>New Contact</span>
            </div>
            <div className="col-12 col-sm-8 m-auto">
                <div className="col-10 m-auto neon-box m-3 p-3">
                    <ul className="list-group break-neon">
                        {store.contactList.map((contact) =>
                            <li key={contact.id} className="list-group-item bg-light bg-gradient mb-3 d-flex justify-content-between">
                                <img className="col-md-3 rounded" src={`https://randomuser.me/api/portraits/men/${getImageId(contact.id)}.jpg`} style={{ width: '150px' }} alt="RandomUser" />
                                <div className="card-body col-md-7 p-2 text-start">
                                    <h5 className="card-title">{contact.name}</h5>
                                    <p className="card-text">
                                        <i className="fa fa-phone"></i> {contact.phone}<br />
                                        <i className="fa fa-location-dot"></i> {contact.address}<br />
                                        <i className="fa fa-envelope"></i> {contact.email}
                                    </p>
                                </div>
                                <div className="col-md-2">
                                    <div className=" d-flex justify-content-end">
                                        <button className="btn btn-warning text-white me-2" onClick={() => handleEdit(contact)}>
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(contact.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}