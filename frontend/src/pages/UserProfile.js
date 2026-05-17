import React, {useEffect, useState} from "react";
import profilecover from "../img/profile-cover.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import EthWalletDisplay from "../components/EthWallet";
import { Link } from "react-router-dom";

function UserProfile({userId}) {
    const{id} = useParams();
    const[user, setUser] = useState(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/${id}`)
            .then((res) => {
            setUser(res.data)
            console.log(res.data)
            console.log(res.data.following)
        })
        .catch((error) =>
            console.error(error))
    }, [id]);

    return  <div className="profile-wrapper">
                <div className="profile-cover">
                    <img src={profilecover} alt="Profile"/>
                </div>
                <div className="profile-info">
                    <div className="following-section">
                        <ul className="following-list">{user?.following.map((f)=>(
                            <li className="following-account" key={f.id}>
                                <Link to={`/user/${f?.id}`}  className="following-account-link">
                                    <div className="following-account-avatar"><img src={f.avatar} alt={f.username} /></div>
                                </Link>
                                <div className="following-account-info">
                                    <Link to={`/user/${f?.id}`}  className="following-account-link">
                                        <div>{f.username}</div>
                                    </Link>
                                    <p>{f.numb_of_followers} followers</p>
                                    <div className="button-submit-container">
                                        <button className="button-submit">Follow</button>
                                    </div>
                                </div>
                                <div>
                                <ul className="nft-list">
                                    {f.owned_nfts.map((nft)=>(
                                        <li key={nft.id}>
                                            <img src={nft.image} alt={nft.name} className="following-account-nft"/>
                                        </li>
                                    ))}
                                </ul>
                                </div>
                            </li>
                        ))}</ul>
                    </div>
                </div>
        <div className="profile-section">
            <img src={user?.avatar ? user?.avatar : "/default-avatar.png"} alt={user?.display_name || "User Avatar"} width={160}/>
            <h1 className="user-name">{user?.display_name || ""}</h1>
            <div><EthWalletDisplay wallet={user?.eth_wallet} /></div>
            <div className="user-bio-section">{user?.bio}</div>
            <div>{user?.portfolio}</div>
        </div>
    </div>
}

export default UserProfile;