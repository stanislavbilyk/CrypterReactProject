import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import {useCountdown} from "../hooks/useCountdown";




function AuctionPage() {
    const {id} = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        api.get( `/api/auction/${id}`).then((res) => {
            setItem(res.data);
        })
    .catch((error) => {
        console.error(error)
        })
    }, [id]);

    const { hours, minutes, seconds } = useCountdown(item?.listing?.auction?.end_time);

    return <div className="listing-wrapper">
        <div className="listing-section">
            <div className="listing-image-container">
                <img src={item?.listing?.nftcard?.image} alt={item?.listing?.nftcard?.name}/>
            </div>
            <div className="listing-info-container">
                <h1>
                    {item?.listing?.nftcard?.name}
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
                        <div className="listing-rendering-users">
                            <div className="listing-rendering-owner">
                                <p className="owner-title">Owner</p>
                                <div className="owner-listing">
                                    {item?.listing?.nftcard?.owner?.display_name}
                                </div>
                            </div>
                            <div className="listing-rendering-creator">
                                <p className="creator-title">Creator</p>
                                <div className="creator-listing">
                                    {item?.listing?.nftcard?.creator?.display_name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="creator-right-bid-container">
                    <div className="creator-right-bid-price">
                        <div className="creator-right-current-bid">Current Bid</div>
                        <div className="creator-right-bid">{item?.listing?.highest_bid?.amount || 0} ETH</div>
                        <div className="creator-right-bid-dollars">{((Number(item?.listing?.highest_bid?.amount) || 0) * 4577.25).toFixed(2)} &#36;</div>
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
            </div>
        </div>
    </div>
}

export default AuctionPage;