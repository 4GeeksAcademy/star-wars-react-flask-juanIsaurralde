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
			isLogged: false,
			isEdit: false,

			people: [],
			planets: [],
			starships: [],

			favorites: [],
			currentItems: 'people',
			currentDetail: {},
			isLoading: false
		},
		actions: {
			login: () => {
				console.log('hello there')
				setStore({isLogged: true})
			},
			// CONTACTS API
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
			setCurrentContact: (contactData) => {
				setStore({ currentContact: contactData });
			},
			setIsEdit: (isEditMode) => {
				setStore({ isEdit: isEditMode })
			},
			// STARWARS API
			getDetails: async (url, uid) => {
				setStore({ isLoading: true })
				const options = { method: 'GET' };
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({ currentDetail: { ...data.result.properties, uid } })
				setStore({ isLoading: false })
			},
			getData: async (section) => {
				if (!localStorage.getItem(section)) {
					const url = `${process.env.STAR_WARS_DATA_API}/${section}`;
					const options = { method: 'GET' };
					const response = await fetch(url, options);
					if (!response.ok) {
						console.log("Error: ", response.status, response.statusText);
						return
					}
					const data = await response.json();
					setStore({ [section]: data.results })
					getActions().setObjectInLocalStorage(section, data.results)
				} else {
					setStore({ [section]: JSON.parse(localStorage.getItem(section)) })
				}
			},
			setCurrentItems: (itemsType) => {
				setStore({ currentItems: itemsType })
			},
			setFavorites: (value) => {
				if (getStore().favorites.indexOf(value) === -1) {
					setStore({ favorites: [...getStore().favorites, value] })
				} else {
					setStore({ favorites: getStore().favorites.filter((item) => item != value) })
				}
			},

			// GENERAL
			capitalice: (text) => {
				return text.charAt(0).toUpperCase() + text.slice(1)
			},
			setObjectInLocalStorage: (section, data) => {
				localStorage.setItem(section, JSON.stringify(data));
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
