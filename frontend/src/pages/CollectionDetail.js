import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";




function CollectionDetail() {
    const {id} = useParams();
    const [collection, setCollection] = useState(null);
    const [collectionItems, setCollectionItems] = useState([]);

    useEffect(() => {
        axios.get( `http://127.0.0.1:8000/api/collection/${id}`).then((res) => {
            setCollection(res.data);
        })
    .catch((error) => {
        console.error(error)
        })
    }, [id]);


    useEffect(() => {
        const getCollectionItems = async () => {
            try {
                const items = await axios.get(`http://127.0.0.1:8000/api/collection/${id}/nftcards`);
                setCollectionItems(items.data);
                console.log(setCollectionItems)
            } catch (error) {
                console.error(error)
            }
        }
        getCollectionItems();
    }, [id])

    return <div className="item-wrapper">
                <div className="item-section">
                    <div className="item-info-container">

                    <div className="item-image-container">
                        <img src={collection?.image} alt={collection?.name}/>
                    </div>
                    <div className="item-info-container">
                        <h1>
                            {collection?.name}
                        </h1>

                    </div>

                    <ul className="item-list">
                        {collectionItems.map(item => (
                            <li key={item.id}>
                                <Link to={`/nftcard/${item.id}`}>
                                    <div className="item">
                                        <div className="item-image">
                                            <img src={`http://127.0.0.1:8000${item.image}`} alt={item?.name}/>
                                        </div>
                                        <div className="item-name">
                                            <h1>
                                                {item?.name}
                                            </h1>

                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
          </div>
    </div>
}

export default CollectionDetail;