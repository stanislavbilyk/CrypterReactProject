import React, {useEffect, useState} from "react";
import api from "../api";
import { Link } from "react-router-dom";



function Auction(props) {
    const [auction, setAuction] = useState([])

    useEffect(() => {
        api.get("/api/auction/?ordering=-created")
            .then(res => {
                setAuction(res.data);
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return <div className="collection-page">
               <div className="collect-container">
                   <h1>Auctions</h1>
                   <ul className="collect-list">
                       {auction.map(item => (
                           <li key={item.id}>
                               <Link to={`/auction/${item.id}`}>
                                   <img src={item?.listing?.nftcard?.image} alt={item?.listing?.nftcard?.name}
                                        className="collect-image"/>
                                   <div className="collect-name">{item?.listing?.nftcard?.name}</div>
                               </Link>
                           </li>
                       ))}
                   </ul>
               </div>
    </div>
}

export default Auction;