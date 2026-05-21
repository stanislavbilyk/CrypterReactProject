import React, {useEffect, useState} from "react";
import CreatorList from "./CreatorList";
import { Link } from "react-router-dom";
import api from "../api";



function AuctionList(props) {
    const[auctionList, setAuctionList] = useState([])

    useEffect(() => {
        api.get("/api/auction")
            .then(res => {
                const data = res.data.results ?? res.data
                setAuctionList(data)
            })
        .catch(err => console.error(err));
    }, []);


    return (
  <div className="auction-wrapper">
      <div className="auction-container">
        {/* большой аукцион слева */}
        {auctionList[1] && (
          <div key={auctionList[1].id} className="auction-item item-1">
            <div className="item-image">
              {auctionList[1].listing?.nftcard?.image ? (
                <img
                  src={auctionList[1].listing.nftcard.image}
                  alt={auctionList[1].listing.nftcard.name}
                />
              ) : (
                "No image"
              )}
            </div>
            <div className="item-container">
              <div className="item-container-info">
                <Link to={`/user/${auctionList[1].listing?.nftcard?.owner?.id}`} >
                  <div className="item-container-avatar">
                  {auctionList[1].listing?.nftcard?.owner?.avatar ? (
                    <img
                      src={auctionList[1].listing.nftcard.owner.avatar}
                      alt="owner avatar"
                    />
                  ) : (
                    "No avatar"
                  )}
                  </div>
                </Link>
              <h3>{auctionList[1].listing?.nftcard?.name || "No name"}</h3>
              </div>
              <div className="item-container-bid">
                  <div className="item-bid-title">Highest bid</div>
                  <div className="item-bid">{auctionList[1].listing?.highest_bid?.amount ?? 0} ETH</div>
              </div>
            </div>
          </div>
        )}

        {/* три аукциона в средней колонке */}

          {auctionList.slice(2, 5).map((item, index) => (
            <div key={item.id} className={`auction-item item-${index + 2}`}
            style={{gridColumn: 2, gridRow: index + 1}}
            >
              <div className="item-image">
                {item.listing?.nftcard?.image ? (
                  <img
                    src={item.listing.nftcard.image}
                    alt={item.listing.nftcard.name}
                  />
                ) : (
                  "No image"
                )}
              </div>
                <div className="item-container">
                    <div>{item.listing?.nftcard?.name || "No name"}</div>
                    <Link to={`/user/${item.listing?.nftcard?.owner?.id}`} >
                        <div className="item-bid-info">
                            <div className="item-container-avatar">
                                {item.listing?.nftcard?.owner?.avatar ? (
                                    <img
                                        src={item.listing.nftcard.owner.avatar}
                                        alt="owner avatar"
                                    />
                                ) : (
                                    "No avatar"
                                )}
                            </div>
                            <div className="item-bid">{item.listing?.highest_bid?.amount ?? 0} ETH</div>
                        </div>
                    </Link>
                    <div className="item-bid-button">
                        <button className="item-button-place-bid">Place a bid</button>
                    </div>
                </div>
            </div>
          ))}


          {/* колонка справа */}
        <CreatorList/>
    </div>
  </div>
);
}

export default AuctionList