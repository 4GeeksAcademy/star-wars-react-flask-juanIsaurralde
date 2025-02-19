import React, { useContext } from "react";
import { Context } from "../store/appContext";
import yoda from "../../img/yoda.jpg"

export const Details = () => {
    const { store, actions } = useContext(Context)

    return (
        <div className="container-fluid">
            <h1 className="text-center text-white my-4">Detail Info</h1>
            {store.isLoading ?
                <div className="text-warning text-center" >From far far away...
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
                :
                <div className="text-white row row-cols-1 row-cols-sm-2 neon-box m-3">
                    <div className="rounded col ps-0">
                        <img className="rounded img-fluid detail-img-custom" onError={(e)=> {e.target.src='https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg'}}
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${store.currentItems === 'people' ? 'characters' : store.currentItems}/${store.currentDetail.uid}.jpg`} alt="" />
                    </div>
                    <div className="p-3 col">
                        <h1 className="text-center">{store.currentDetail.name}</h1>
                        <ul className="list-group break-neon">
                            {Object.entries(store.currentDetail).map(([itemKey, itemValue]) => {
                                itemKey = itemKey.replace(/_/g, " ");
                                itemKey = actions.capitalice(itemKey);
                                return (itemKey !== 'Created' && itemKey !== 'Edited' && itemKey !== 'Name' && itemKey !== 'Url' && itemKey !== 'Uid' ?
                                    (<li className="list-group-item bg-dark-list my-1" key={itemKey} >
                                        <strong className="me-2">{itemKey}: </strong> {itemValue}
                                    </li>) : ''
                                )
                            })}
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}