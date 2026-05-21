import React, {useEffect, useState} from "react";
import api from "../api";
import { Link } from "react-router-dom";



function Listing(props) {
    const [listing, setListing] = useState([])

    useEffect(() => {
        api.get("/api/listing/?ordering=-created")
            .then(res => {
                setListing(res.data);
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return <div className="collection-page">
               <div className="collect-container">
                   <h1>New Listings</h1>
                   <ul className="collect-list">
                       {listing.map(item => (
                           <li key={item.id}>
                               <Link to={`/listing/${item.id}`}>
                                   <img src={item?.nftcard?.image} alt={item?.nftcard?.name}
                                        className="collect-image"/>
                                   <div className="collect-name">{item?.nftcard?.name}</div>
                               </Link>
                           </li>
                       ))}
                   </ul>
               </div>
    </div>
}

export default Listing;