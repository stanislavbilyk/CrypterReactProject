import React, {useEffect, useState} from "react";
import axios from "axios";

import {useCountdown} from "../hooks/useCountdown";
import AuctionList from "./AuctionList";
import Seller from "./Seller";
import price from "../img/instant-price-icon.png";
import { Link } from "react-router-dom";
import HotBid from "./HotBid";
import Collection from "./Collection";

function Creator(props) {
    const [listing, setListing] = useState(null);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/listing/1")
            .then((res) => {
                console.log("LISTING API response:", res.data);
                setListing(res.data)
            })
            .catch((error) => console.error(error))
    }, []);

    const { hours, minutes, seconds } = useCountdown(listing?.auction?.end_time);

    if (!listing) return <div>Loading...</div>


  return <div className="creator-auction">
            <div className="creator-container">
              <div className="creator-top">
                  <div className="creator-top-info">CREATE, EXPLORE, & COLLECT DIGITAL ART NFTS.</div>
                  <div className="creator-top-title">
                      <h1>The new creative economy.</h1>
                  </div>
                  <div className="creator-top-button">Start your search</div>
              </div>
              <div className="creator-wrapper">
                        <div className="creator-left">
                            <img src={listing.nftcard?.image || ""} alt={listing?.nftcard.name || "NFT Image"}/>
                        </div>
                        <div className="creator-right">
                            <div className="creator-right-title">
                                <h1 className="creator-title">The creator <br/> network &#174;</h1>
                            </div>
                            <div className="creator-right-sell">
                                <Link to={`/user/${listing.nftcard?.creator?.id}`} >
                                    <div className="creator-right-seller">
                                        <div className="creator-right-photo">
                                            <img
                                                src={
                                                    listing.nftcard?.creator?.avatar
                                                        ? listing.nftcard.creator.avatar
                                                        : "/default-avatar.png"
                                                }
                                                alt={listing.nftcard?.creator?.display_name || "Creator Avatar"}
                                            />
                                        </div>
                                        <div className="creator-right-profile">
                                            <div className="creator-right-info">Creator</div>
                                            <div className="creator-right-name">{listing.nftcard?.creator?.display_name || ""}</div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="creator-right-price-container">
                                    <div className="creator-right-img">
                                        <img src={price} alt="Instant price"/>
                                    </div>
                                    <div className="creator-right-price-info">
                                        <div className="creator-right-instant-price">Instant price</div>
                                        <div className="creator-right-price">{listing.price} ETH</div>
                                    </div>
                                </div>
                            </div>
                            <div className="creator-right-bid-container">
                                <div className="creator-right-bid-price">
                                    {console.log("Creator listing.highest_bid:", listing?.highest_bid)}
                                  <div className="creator-right-current-bid">Current Bid</div>
                                  <div className="creator-right-bid">{listing?.highest_bid?.amount || 0} ETH</div>
                                  <div className="creator-right-bid-dollars">{((Number(listing?.highest_bid?.amount) || 0) * 4577.25).toFixed(2)} &#36;</div>
                                </div>
                                <div className="creator-right-bid-auction">
                                    <div className="creator-right-auction-title">Auction ending in</div>
                                    <div className="creator-right-auction-time">
                                        <div className="creator-right-auction-time-hrs">
                                            <div className="auction-time-hrs time-value">{hours.toString().padStart(2, "0")}</div>
                                            <div className="auction-time-hrs-title time-text">Hrs</div>
                                        </div>
                                        <div className="creator-right-auction-time-min">
                                            <div className="auction-time-min time-value">{minutes.toString().padStart(2, "0")}</div>
                                            <div className="auction-time-min-title time-text">Min</div>
                                        </div>
                                        <div className="creator-right-auction-time-sec">
                                            <div className="auction-time-sec time-value">{seconds.toString().padStart(2, "0")}</div>
                                            <div className="auction-time-sec-title time-text">Sec</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="creator-right-buttons">
                                <div className="creator-right-button-bid">
                                    <button className="button-place-bid">Place a bid</button>
                                </div>
                                <div className="creator-right-button-view">
                                    <button className="button-view-item">View item</button>
                                </div>
                            </div>
                            <div className="creator-right-arrows"></div>
                        </div>
                    </div>
          </div>
      <AuctionList/>
      <Seller/>
      <HotBid/>
      <Collection/>
      </div>
}

export default Creator;