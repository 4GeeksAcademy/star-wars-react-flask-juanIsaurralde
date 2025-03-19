import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleLogin = (event) => {
        event.preventDefault()
        const dataToSend = { email, password }
        actions.login(dataToSend); 
    }
    useEffect(()=>{
        if(store.isLogged){
            navigate('/home')
        }
    },[store.isLogged])
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center">Login</h2>
                    <form id="loginForm" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Email</label>
                            <input type="text" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}