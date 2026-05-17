import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function HotBid(props) {
    const [bid, setBid] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/bid/?ordering=-created_at&limit=4")
            .then(res => {
                setBid(res.data.results)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

        return <div className="bid-wrapper">
              <div className="bid-container">
                  <h1 className="title-hot-bid">Hot Bid</h1>
                  <ul className="bid-list">
                      {bid.map(bid => (
                          <li key={bid.id}>
                              <Link to={`/listing/${bid?.item?.id}`} className="hot-bid-listing-link">
                                  <img src={bid?.item?.nftcard?.image} alt={bid.item?.nftcard?.name}
                                       className="hot-bid-listing-image"/>
                                  <div className="listing-name">{bid?.item?.nftcard?.name}</div>
                              </Link>
                              <Link to={`/user/${bid?.item?.seller?.id}`} className="hot-bid-listing-seller">
                                <div className="hot-bid-info">
                                    <div className="hot-bid-seller-info">
                                        <div className="seller-avatar">
                                            <img src={bid?.item?.seller?.avatar} alt={bid.item.seller.display_name}/>
                                        </div>
                                        <div className="seller-name">{bid?.item?.seller?.display_name}</div>
                                    </div>
                                    <div className="seller-price">{bid?.item?.highest_bid?.amount} ETH</div>
                                </div>
                              </Link>
                          </li>
                          ))}
                  </ul>

              </div>
            </div>
}

export default HotBid