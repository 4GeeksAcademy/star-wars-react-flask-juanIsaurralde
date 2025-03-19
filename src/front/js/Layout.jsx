import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import injectContext, { Context } from "./store/appContext.js";
// Custom Component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom Pages or views
import { Home } from "./pages/Home.jsx";
import { Cards } from "./pages/Cards.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { ContactForm } from "./pages/ContactForm.jsx";
import { Details } from "./pages/Details.jsx";
import { Login } from "./pages/Login.jsx";
import { Profile } from "./pages/Profile.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const { store } = useContext(Context)
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="stars"></div>
            <div className="nebula"></div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                        <Routes>
                            <Route element={<Login />} path="/" />
                            <Route element={<Home />} path="/home" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<Contact />} path="/contact" />
                            <Route element={<ContactForm />} path="/contact/new" />
                            <Route element={<ContactForm />} path="/contact/edit" />
                            <Route element={<Cards />} path="/characters" />
                            <Route element={<Cards />} path="/planets" />
                            <Route element={<Cards />} path="/starships" />
                            <Route element={<Details />} path="/details" />
                            <Route element={<Profile />} path="/profile" />
                            <Route element={<Error404 />} path="*" />
                        </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
