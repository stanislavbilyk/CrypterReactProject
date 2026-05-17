import React from "react";
import card from "../img/card.png";
import collection from "../img/collection.png";
import documentary from "../img/documentary.png";
import folder from "../img/folder_16924758.png";
import nft from "../img/nft.png";
import user from "../img/user.png";
import settings from "../img/settings.png";
import { Link } from "react-router-dom";




function Sidebar(props) {

  return <aside className="sidebar">
      <ul className="sidebar-list">
          <li><Link to={`/collection`}><img src={collection} alt="Collection"/><span>Collections</span></Link></li>
          <li><Link to={`/genre`}><img src={folder} alt="Folder"/><span>Genres</span></Link></li>
          <li><Link to={`/listing`}><img src={documentary} alt="Documentary"/><span>Listings</span></Link></li>
          <li><Link to={`/nftcard`}><img src={nft} alt="Nft"/><span>Nft cards</span></Link></li>
          <li><Link to={`/auction`}><img src={card} alt="Card"/><span>Auctions</span></Link></li>
          <li><Link to={`/login`}><img src={user} alt="User"/><span>Profile</span></Link></li>
          <li><Link to={`/settings`}><img src={settings} alt="Settings"/><span>Settings</span></Link></li>
      </ul>
  </aside>;
}

export default Sidebar;