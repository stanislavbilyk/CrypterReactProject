import React, {useEffect, useState} from "react";
import api from "../api";
import { Link } from "react-router-dom";



function NftCard(props) {
    const [nftCard, setNftCard] = useState([])

    useEffect(() => {
        api.get("/api/nftcard/?ordering=-created")
            .then(res => {
                setNftCard(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return <div className="collection-page">
               <div className="collect-container">
                   <h1>New NFT</h1>
                   <ul className="collect-list">
                       {nftCard.map(item => (
                           <li key={item.id}>
                               <Link to={`/nftcard/${item.id}`}>
                                   <img src={item?.image} alt={item?.name}
                                        className="collect-image"/>
                                   <div className="collect-name">{item?.name}</div>
                               </Link>
                           </li>
                       ))}
                   </ul>
               </div>
    </div>
}

export default NftCard;