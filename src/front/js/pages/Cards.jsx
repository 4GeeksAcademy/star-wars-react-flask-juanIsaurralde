import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../component/PageTitle.jsx";

export const Cards = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const handleFavorite = (item) => {
        actions.setFavorites(item.name)
    }
    return (
        <div className="mx-5">
            <PageTitle title={store.currentItems === 'people' ? 'Characters' : actions.capitalice(store.currentItems)}/>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                {store[store.currentItems].map((item, index) =>
                    <div className="col" key={index}>
                        <div className="card neon-box m-2" >
                            <div className="card-img-container">
                                <img className="card-img-top img-fluid rounded img-custom " alt={item.name} onError={(e) => { e.target.src = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/big-placeholder.jpg" }}
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${store.currentItems === 'people' ? 'characters' : store.currentItems}/${item.uid}.jpg`} />
                            </div>
                            <div className="card-body d-flex flex-column justify-content-between info-box">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="d-flex justify-content-between break-neon ">
                                    <span className="btn btn-primary" onClick={() => { actions.getDetails(item.url, item.uid); navigate('/details') }} >Details</span>
                                    <span className={`btn btn-${store.favorites.indexOf(item.name) === -1 ? 'outline-warning' : 'warning selected'}`} onClick={() => handleFavorite(item)}><i className="far fa-heart fa-lg"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}