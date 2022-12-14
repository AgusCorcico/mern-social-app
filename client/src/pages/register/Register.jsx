import axios from 'axios';
import React, { useRef } from 'react';
import "./register.css";
import {useHistory} from "react-router"; /* para visitar paginas anteriores o cualquier pagina */

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e) =>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Password dont match!")
        }else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
        try {
            await axios.post("/auth/register", user);
            history.push("/login");
        } catch (err) {
            console.log(err)
        }
        }

    };



    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">AguSocial</h3>
                    <span className="loginDesc">Connect with friends and the world around you on AguSocial.</span>
                </div>
                <div className="loginRight" onSubmit={handleClick}>
                    <form className="loginBox">
                        <input 
                            placeholder="Username" 
                            required 
                            ref={username} 
                            className="loginInput"
                            />
                        <input 
                            placeholder="Email" 
                            required 
                            ref={email} 
                            className="loginInput" 
                            type="email"
                            />
                        <input 
                            placeholder="Password" 
                            required 
                            ref={password} 
                            className="loginInput"
                            type="password"
                            minLength="6"
                            />
                        <input 
                            placeholder="Password Again" 
                            required 
                            ref={passwordAgain} 
                            className="loginInput"
                            type="password" 
                            minLength="6"
                            />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
