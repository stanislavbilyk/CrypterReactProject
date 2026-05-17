import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";



function NftCard(props) {
    const [nftCard, setNftCard] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/nftcard/?ordering=-created")
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