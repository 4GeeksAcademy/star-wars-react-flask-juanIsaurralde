import React, { useEffect, useState } from "react";

export const Contact = () => {
    const uri = 'https://playground.4geeks.com/contact/agendas';
    const user = 'juanIsa';

    const [contactList, setContactList] = useState([]);
    const [contactData, setContactData, getContactData] = useState({});
const mockContact = {
    "name": "ejemplo",
    "phone": "ejemplo",
    "email": "ejemplo@mail",
    "address": "ejemplo",
}

    const setContactDataMock = () => {
        setContactData({
            "name": "ejemplo",
            "phone": "ejemplo",
            "email": "ejemplo@mail",
            "address": "ejemplo",
        })

        createContact();
    }

    const createAgenda = async () => {
        const url = `${uri}/${user}`;
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            console.log("Error Creating Agenda: ", response.status, response.statusText);
            return
        }
        console.log('estoy intentando crear agenda de nuevo')
        await setContactDataMock();
    }
    const createContact = async () => {
        const url = `${uri}/${user}/contacts`;
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(contactData) 
        };
         const response = await fetch(url, options);
        if (!response.ok) {
            console.log("Error Creating Contact: ", response.status, response.statusText);
            return
        }
        await getContacts() 
    }
    const getContacts = async () => {
        const url = `${uri}/${user}/contacts`;
        const options = { method: 'GET' };
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status == 404) {
                console.log('soy 404')
               // await createAgenda();
            } else {
                console.log("Error: ", response.status, response.statusText);
            }
        }
        const data = await response.json();
        console.log('data.contacts.length', data.contacts.length)
        setContactList(data.contacts)
    }
    useEffect(() => { 
        getContacts() 
    }, [])

    return (
        <div className=" col-8 m-auto">
            <h1>Contacts</h1>
            <ul className="list-group">
                {contactList.map((contact) =>
                    <li key={contact.id} className="list-group-item bg-light bg-gradient mb-3 d-flex justify-content-between">
                        <img className="col-md-3 rounded" src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100) + 1}.jpg`} style={{ width: '150px' }} alt="RandomUser" />
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
                                <button className="btn btn-warning text-white me-2" onClick={()=>handleDelete(contact.id)}>
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button type="button" className="btn btn-danger">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}