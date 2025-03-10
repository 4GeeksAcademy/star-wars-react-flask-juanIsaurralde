import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
const {store, actions}= useContext(Context)
const navigate = useNavigate()
const handleLogin = () => {
    actions.login();
    navigate('/')
}
    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <h2 class="text-center">Login</h2>
                    <form id="loginForm" onSubmit={handleLogin}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" placeholder="Enter username" required/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter password" required/>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}