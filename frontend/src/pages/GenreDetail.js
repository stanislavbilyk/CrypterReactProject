import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";


function GenreDetail() {
    const {id} = useParams();
    const [genre, setGenre] = useState(null);
    const [genreItems, setGenreItems] = useState([]);

    useEffect(() => {
        api.get( `/api/genre/${id}`).then((res) => {
            setGenre(res.data);
        })
    .catch((error) => {
        console.error(error)
        })
    }, [id]);

    useEffect(() => {
        const getGenreItems = async () => {
            try {
                const items = await api.get(`/api/genre/${id}/nftcards`);
                setGenreItems(items.data);
                console.log(setGenreItems)
            } catch (error) {
                console.error(error)
            }
        }
        getGenreItems();
    }, [id])



    return <div className="item-wrapper">
               <div className="item-section">
                   <div className="item-info-container">
                       <h1>
                           {genre?.name}
                       </h1>
                       <ul className="item-list">
                           {genreItems.map(item => (
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

export default GenreDetail;