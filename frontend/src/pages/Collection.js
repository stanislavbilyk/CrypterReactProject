import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";



function Collection(props) {
    const [collection, setCollection] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/collection/?ordering=-created")
            .then(res => {
                setCollection(res.data.results)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return <div className="collection-page">
               <div className="collect-container">
                   <h1>Hot Collections</h1>
                   <ul className="collect-list">
                       {collection.map(collect => (
                           <li key={collect.id}>
                               <Link to={`/collection/${collect.id}`}>
                                   <img src={collect?.image} alt={collect?.name}
                                        className="collect-image"/>
                                   <div className="collect-name">{collect?.name}</div>
                               </Link>
                           </li>
                       ))}
                   </ul>
               </div>
    </div>
}

export default Collection;