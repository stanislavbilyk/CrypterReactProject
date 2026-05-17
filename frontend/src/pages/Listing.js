import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";



function Listing(props) {
    const [listing, setListing] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/listing/?ordering=-created")
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