import React, { useState } from "react";
import axios from "axios";
import logoregister from "../img/logo-register2.jpg";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [display_name, setDisplay_name] = useState("")
    const [custom_url, setCustom_url] = useState("")
    const [bio, setBio] = useState("")
    const [portfolio, setPortfolio] = useState("")
    const [twitter, setTwitter] = useState("")
    const [eth_wallet, setEth_wallet] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [error, setError] = useState("");

    const handleRegister = () => {

        setError("")

        if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
    }
        const formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);
        formData.append("display_name", display_name);
        formData.append("bio", bio);
        formData.append("portfolio", portfolio);
        formData.append("twitter", twitter);
        formData.append("eth_wallet", eth_wallet);

        if (custom_url) {
            formData.append("custom_url", custom_url);
        }

        if (email) {
            formData.append("email", email);
        }

        if (avatar) {
          formData.append("avatar", avatar);
        }
        axios.post("http://127.0.0.1:8000/api/register/", formData)
        .then(res => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            alert("User created!");
        })
        .catch(err => {
            console.error(err.response?.data);
            setError(JSON.stringify(err.response?.data));
        });
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-left">
                    <h2 className="login-title">Register</h2>
                    <h1 className="signin-title">Create your</h1>
                    <h1 className="signin-title">NFT Account</h1>
                    <form className="login-box"
                          onSubmit={(e) => {
                              e.preventDefault();
                              handleRegister();
                          }}>
                        <input
                            placeholder="Username"
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            placeholder="Display name"
                            onChange={e => setDisplay_name(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <input
                            placeholder="Profile URL"
                            onChange={e => setCustom_url(e.target.value)}
                        />
                        <textarea
                            placeholder="Tell about yourself"
                            onChange={e => setBio(e.target.value)}
                        />
                        <input
                            placeholder="Portfolio website"
                            onChange={e => setPortfolio(e.target.value)}
                        />
                        <input
                            placeholder="Twitter link"
                            onChange={e => setTwitter(e.target.value)}
                        />
                        <input
                            placeholder="Wallet address"
                            onChange={e => setEth_wallet(e.target.value)}
                        />
                        <label className="file-upload">
                            <span>Upload avatar</span>
                            <input
                                type="file"
                                onChange={(e) => setAvatar(e.target.files[0])}
                            />
                        </label>
                        <button type="submit">Register</button>
                        {error && <div>{error}</div>}

                    </form>
                </div>
                <div className="login-right">
                    <img src={logoregister} alt="logo-register"/>
                </div>
            </div>
        </div>


    )
}

export default Register;