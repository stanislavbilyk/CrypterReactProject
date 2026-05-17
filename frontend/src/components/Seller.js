import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Seller(props) {
    const [listing, setListing] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/listing/?ordering=-created_at&limit=5")
            .then(res => {
                setListing(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const uniqueSeller = [...new Map(listing.map(listing => [listing.seller.id, listing])).values()].slice(0, 5).sort((a,b) => new Date(b.created_at) - new Date(a.created_at))

    return <div className="sellers-wrapper">
              <div className="sellers-container">
                  <h2 className="title-popular">Popular</h2>
                  <h1>Sellers </h1>
                  <ul className="sellers-list">
                      {uniqueSeller.map(listing => (
                          <li key={listing.seller.id}>
                              <Link to={`/user/${listing?.seller?.id}`} className="seller-link">
                                  <img src={listing.seller.avatar} alt={listing.seller.display_name}/>
                                  <div className="seller-name">{listing.seller.display_name}</div>
                                  <div className="seller-price">{listing.price} ETH</div>
                              </Link>
                          </li>
                      ))}
                  </ul>

              </div>
            </div>
}

export default Seller