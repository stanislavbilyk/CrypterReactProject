import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";



function Genre(props) {
    const [genre, setGenre] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/genre/?ordering=-created")
            .then(res => {
                setGenre(res.data.results)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return <div className="genre-page">
               <div className="genre-container">
                   <h1>Genres</h1>
                   <ul className="genre-list">
                       {genre.map(genre => (
                           <li key={genre.id}>
                               <Link to={`/genre/${genre.id}`}>
                                   <div className="genre-name">{genre?.name}</div>
                               </Link>
                           </li>
                       ))}
                   </ul>
               </div>
    </div>
}

export default Genre;