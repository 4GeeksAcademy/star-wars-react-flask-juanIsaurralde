import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
const {store}= useContext(Context)
    return (
        <div className="text-white">Soy {store.section}</div>
    )
}