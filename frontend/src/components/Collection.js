import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Collection(props) {
    const [collection, setCollection] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/collection/?ordering=-created_at&limit=3")
            .then(res => {
                setCollection(res.data.results)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return <div className="collection-wrapper">
              <div className="collection-container">
                  <h1 className="title-hot-collections">Hot Collections</h1>
                  <ul className="collection-list">
                      {collection.map(item => (
                          <li key={item.id}>
                              <Link to={`/collection/${item?.id}`} className="hot-collection-link">
                                  <img src={item?.image} alt={item?.name}
                                       className="hot-collection-image"/>
                                  <div className="collection-name">{item?.name}</div>
                                  <div className="number-of-items-in-collection">{item?.numb_of_items_in_collection} items</div>
                              </Link>
                          </li>
                          ))}
                  </ul>

              </div>
            </div>

}

export default Collection