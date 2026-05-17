import React, {useState} from "react";
import axios from "axios";
import logoforlogin from "../img/logo-for-login.jpg"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/token/", {
                username,
                password
            })
            const token = res.data.token;

            const userRes = await axios.get("http://127.0.0.1:8000/api/me/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            login(token, userRes.data);

            navigate("/");

        } catch(err) {
            setError("Invalid credentials")
        }
    }
    return (
        <div className="login-wrapper">
        <div className="login-container">
            <div className="login-left">
                <h2 className="login-title">LOGIN PAGE</h2>
                <h1 className="signin-title">Sing in to your</h1>
                <h1 className="signin-title">NFT Account</h1>
                <div className="login-box">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button onClick={handleLogin}>Sign in</button>
                    {error && <div>{error}</div>}
                    <Link to={`/forgot-password`} className="forgot-password-link">Forgot your password?</Link>
                    <Link to={`/register`} className="sing-up-link">Don't have an Account yet? &nbsp;<b>Sign up</b></Link>
                </div>
            </div>
            <div className="login-right">
                <img src={logoforlogin} alt="logo-for-login"/>
            </div>
        </div>
        </div>
    )
}

export default Login;