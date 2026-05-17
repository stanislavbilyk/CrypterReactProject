import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CreatorList(props) {
    const[creatorList, setCreatorList] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/nftcard")
            .then(res => {
                const data = res.data.results ?? res.data
                setCreatorList(data)
            })
            .catch(err => console.error(err))
    }, []);


    const uniqueCreators = [...new Map(creatorList.map(nftcard => [nftcard.creator.id, nftcard])).values()].sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    return <div className="creator-wrapper-list">
        <div className="creator-container-list">
            <h5>Latest uploads from creators &#128293;</h5>
            <ul>
                {uniqueCreators.map(nft => (
                    <li key={nft.creator.id}>
                        <Link to={`/user/${nft?.creator?.id}`} className="creator-link">
                            <img
                                src={nft.creator.avatar}
                                alt={nft.creator.display_name}
                            />
                            <div>{nft.creator.display_name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="discover-more-button">
                <button className="creator-discover-more-button">Discover more  &rarr;</button>
            </div>
        </div>
    </div>

}


export default CreatorList