const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contactList: [],
			currentContact: {
				"name": "",
				"phone": "",
				"email": "",
				"address": "",
			},
			mockContact: {
				"name": "Ejemplo",
				"phone": "Ejemplo",
				"email": "ejemplo@mail",
				"address": "Ejemplo",
			},
			user: 'juanIsa',
			isEdit: false
		},
		actions: {
			getContacts: async () => {
				const url = `${process.env.CONTACT_BASE_URL}/${getStore().user}/contacts`;
				const options = { method: 'GET' };
				const response = await fetch(url, options);
				if (!response.ok) {
					if (response.status == 404) {
						getActions().createAgenda();
					} else {
						console.log("Error al buscar contactos: ", response.status, response.statusText);
					}
					return
				}
				const data = await response.json();
				if (data.contacts.length === 0) {
					setStore({ currentContact: getStore().mockContact })
					getActions().createContact()
				} else {
					setStore({ contactList: data.contacts })
				}

			},
			createContact: async () => {
				const url = `${process.env.CONTACT_BASE_URL}/${getStore().user}/contacts`;
				const options = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(getStore().currentContact)
				};
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error Creating Contact: ", response.status, response.statusText);
					return
				}
				getActions().getContacts()

			},
			updateContact: async () => {
				const url = `${process.env.CONTACT_BASE_URL}/${getStore().user}/contacts/${getStore().currentContact.id}`;
				const options = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(getStore().currentContact)
				};
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error Creating Contact: ", response.status, response.statusText);
					return
				}
				getActions().getContacts()
			},
			deleteContact: async (contactId) => {
				const url = `${process.env.CONTACT_BASE_URL}/${getStore().user}/contacts/${contactId}`;
				const options = {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
				};
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error Creating Contact: ", response.status, response.statusText);
					return
				}
				getActions().getContacts()
			},
			createAgenda: async () => {
				
					const url = `${process.env.CONTACT_BASE_URL}/${getStore().user}`;
					const options = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' }
					};
					const response = await fetch(url, options);
					if (!response.ok) {
						console.log("Error Creating Agenda: ", response.status, response.statusText);
						return
					}
					setStore({ currentContact: getStore().mockContact })
					getActions().createContact()
			},
			
			setCurrentContact: (contactData)=>{
				setStore({currentContact: contactData});
			},
			setIsEdit: (isEditMode)=>{
				setStore({isEdit: isEditMode})
			},


			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
