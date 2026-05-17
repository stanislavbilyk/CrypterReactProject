import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";




function ListingPage() {
    const {id} = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        axios.get( `http://127.0.0.1:8000/api/listing/${id}`).then((res) => {
            setItem(res.data);
        })
    .catch((error) => {
        console.error(error)
        })
    }, [id]);



    return <div className="listing-wrapper">
               <div className="listing-section">
                   <div className="listing-image-container">
                       <img src={item?.nftcard?.image} alt={item?.nftcard?.name}/>
                   </div>
                   <div className="listing-info-container">
                       <h1>
                           {item?.nftcard?.name}
                       </h1>
                       <div className="listing-price-section">
                           <div className="listing-etn-price">
                               {item?.price || 0} ETH
                           </div>
                           <div className="listing-usd-price">
                               {((Number(item?.price) || 0) * 4577.25).toFixed(2)} &#36;
                           </div>
                       </div>
                       <div className="listing-description">
                           This NFT Card will give you Access to Special Airdrops. To learn more about UI8 please visit <a
                           href="https://ui8.net">https://ui8.net</a>
                       </div>
                       <div className="listing-info-block">
                           <div className="top-panel">
                               <div className="info-section">Info</div>
                               <div className="owners-section">Owners</div>
                               <div className="history-section">History</div>
                               <div className="bids-section">Bids</div>
                           </div>
                           <div className="listing-rendering-info">
                               <div className="listing-rendering-users" >
                                   {item?.nftcard?.owner?.id != null ? (
                                       <Link
                                           className="listing-rendering-owner"
                                           to={`/user/${item.nftcard.owner.id}`}
                                           style={{ textDecoration: 'none', color: 'inherit' }}
                                       >
                                       <div className="listing-rendering-owner-image">
                                           <img src={item?.nftcard?.owner?.avatar}
                                                alt={item?.nftcard?.owner?.display_name}
                                                className="listing-owner-image"/>
                                       </div>
                                       <div className="listing-owner-name">
                                            <p className="owner-title">Owner</p>
                                            <div className="owner-listing">
                                                {item?.nftcard?.owner?.display_name}
                                            </div>
                                       </div>
                                       </Link>
                                   ) : (
                                       <div className="listing-rendering-owner">
                                       <div className="listing-rendering-owner-image">
                                           <img src={item?.nftcard?.owner?.avatar}
                                                alt={item?.nftcard?.owner?.display_name}
                                                className="listing-owner-image"/>
                                       </div>
                                       <div className="listing-owner-name">
                                            <p className="owner-title">Owner</p>
                                            <div className="owner-listing">
                                                {item?.nftcard?.owner?.display_name}
                                            </div>
                                       </div>
                                       </div>
                                   )}
                                   {item?.nftcard?.creator?.id != null ? (
                                       <Link
                                           className="listing-rendering-creator"
                                           to={`/user/${item.nftcard.creator.id}`}
                                           style={{ textDecoration: 'none', color: 'inherit' }}
                                       >
                                       <div className="listing-rendering-creator-image">
                                           <img src={item?.nftcard?.creator?.avatar}
                                                alt={item?.nftcard?.creator?.display_name}
                                                className="listing-creator-image"/>
                                       </div>
                                       <div className="listing-creator-name">
                                            <p className="creator-title">Creator</p>
                                            <div className="creator-listing">
                                                {item?.nftcard?.creator?.display_name}
                                            </div>
                                       </div>
                                       </Link>
                                   ) : (
                                       <div className="listing-rendering-creator">
                                       <div className="listing-rendering-creator-image">
                                           <img src={item?.nftcard?.creator?.avatar}
                                                alt={item?.nftcard?.creator?.display_name}
                                                className="listing-creator-image"/>
                                       </div>
                                       <div className="listing-creator-name">
                                            <p className="creator-title">Creator</p>
                                            <div className="creator-listing">
                                                {item?.nftcard?.creator?.display_name}
                                            </div>
                                       </div>
                                       </div>
                                   )}
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
    </div>
}

export default ListingPage;