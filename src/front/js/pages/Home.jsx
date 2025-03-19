import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import starWarsPoster from "../../img/poster.webp"
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const handleCLick = () => {
		actions.cambiarJennyAnnie('Estoy en home')
	}
	
	return (
		<div className="d-flex justify-content-center">
			<img width={'95%'} src={starWarsPoster} onClick={handleCLick}/>
		</div>
	);
};
