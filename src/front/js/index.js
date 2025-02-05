import React from "react"; //import react into the bundle
import ReactDOM from "react-dom";
import "../styles/index.css"; //include your index.scss file into the bundle
import Layout from "./Layout.jsx"; //import your own components

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
