import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const handleDelete = (item) => {
		actions.setFavorites(item)
	}
	return (

		<nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom p-3">
			<div className="container-fluid d-flex justify-content-between">
				<Link to="/" role="button">
					<img src='https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png' height="40px" alt="starwars logo" />
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item" role="button">
							<a className="nav-link" onClick={() => {
								actions.setCurrentItems('people')
								navigate('/characters')
							}} >Characters</a>
						</li>
						<li className="nav-item" role="button">
							<a className="nav-link" onClick={() => {
								actions.setCurrentItems('planets')
								navigate('/planets')
							}}>Planets</a>
						</li>
						<li className="nav-item" role="button">
							<a className="nav-link" onClick={() => {
								actions.setCurrentItems('starships')
								navigate('/starships')
							}}>Starships</a>
						</li>
						<li className="nav-item" role="button">
							<a className="nav-link" onClick={() => navigate('/contact')}>Contacts</a>
						</li>
						<li >
							<div className="dropdown">
								<button className="btn btn-secondary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									Favorites
									<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
										{store.favorites.length}
										<span className="visually-hidden">Favorites</span>
									</span>
								</button>
								<ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end ">
									{ store.favorites.length < 1 ? <li><span className="dropdown-item ">No Favorites</span></li> :
										store.favorites.map((item, index) =>
											<li key={index}>
												<span className="dropdown-item d-flex justify-content-between align-items-center" >
													{item}
													<button type="button" className="btn btn-outline-danger ms-3" >
														<i className="fa fa-trash" onClick={() => handleDelete(item)}></i>
													</button>
												</span>
											</li>
										)
									}
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
