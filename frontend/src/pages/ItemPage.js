import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";



function ItemPage() {
    const {id} = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const getNftItem = async () => {
            try {
                const getItem = await api.get( `/api/nftcard/${id}`);
                setItem(getItem.data)
            } catch (error) {
                console.error(error)
        }
        }
        getNftItem();
    }, [id]);

    return <div className="item-wrapper">
               <div className="item-section">
                   <div className="item-image-container">
                       <img src={item?.image} alt={item?.name}/>
                   </div>
                   <div className="item-info-container">
                       <h1>
                           {item?.name}
                       </h1>
                       <div className="listing-price-section">
                           <div className="listing-etn-price">
                               {item?.listing?.price || 0} ETH
                           </div>
                           <div className="listing-usd-price">
                               {((Number(item?.listing?.price) || 0) * 4577.25).toFixed(2)} &#36;
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
                                   {item?.owner?.id != null ? (
                                       <Link
                                           className="listing-rendering-owner"
                                           to={`/user/${item.owner.id}`}
                                           style={{ textDecoration: 'none', color: 'inherit' }}
                                       >
                                       <div className="listing-rendering-owner-image">
                                           <img src={item?.owner?.avatar}
                                                alt={item?.owner?.display_name}
                                                className="listing-owner-image"/>
                                       </div>
                                       <div className="listing-owner-name">
                                            <p className="owner-title">Owner</p>
                                            <div className="owner-listing">
                                                {item?.owner?.display_name}
                                            </div>
                                       </div>
                                       </Link>
                                   ) : (
                                       <div className="listing-rendering-owner">
                                       <div className="listing-rendering-owner-image">
                                           <img src={item?.owner?.avatar}
                                                alt={item?.owner?.display_name}
                                                className="listing-owner-image"/>
                                       </div>
                                       <div className="listing-owner-name">
                                            <p className="owner-title">Owner</p>
                                            <div className="owner-listing">
                                                {item?.owner?.display_name}
                                            </div>
                                       </div>
                                       </div>
                                   )}
                                   {item?.creator?.id != null ? (
                                       <Link
                                           className="listing-rendering-creator"
                                           to={`/user/${item.creator.id}`}
                                           style={{ textDecoration: 'none', color: 'inherit' }}
                                       >
                                       <div className="listing-rendering-creator-image">
                                           <img src={item?.creator?.avatar}
                                                alt={item?.creator?.display_name}
                                                className="listing-creator-image"/>
                                       </div>
                                       <div className="listing-creator-name">
                                            <p className="creator-title">Creator</p>
                                            <div className="creator-listing">
                                                {item?.creator?.display_name}
                                            </div>
                                       </div>
                                       </Link>
                                   ) : (
                                       <div className="listing-rendering-creator">
                                       <div className="listing-rendering-creator-image">
                                           <img src={item?.creator?.avatar}
                                                alt={item?.creator?.display_name}
                                                className="listing-creator-image"/>
                                       </div>
                                       <div className="listing-creator-name">
                                            <p className="creator-title">Creator</p>
                                            <div className="creator-listing">
                                                {item?.creator?.display_name}
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

export default ItemPage;