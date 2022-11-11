import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Avatar from '../images/avatar.png';
import "../App.css";
import "./Navbar.css";
import AuthService from "../services/auth.service";

const Navbar = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [userUrl, setUserUrl] = useState("")

    useEffect(() => {

        const user = AuthService.getCurrentUser();

        if (user) {
            const USER_URL = "/files/" + user["username"];
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setUserUrl(USER_URL);
        }

    }, []);

    const logOut = () => {
    AuthService.logout();
    };

    return (
        <div className="navbar">
            {currentUser ? (
                <div className="hello">
                    <p>HELLO!</p>
                    <img src={Avatar} alt="Avatar" className="avatar"/>
                </div>
            ) : (
                <div className="welcome">
                    <Link to={"/"} className="link">
                        <pr>
                            WELCOME
                            TO
                            .FOTOLOG
                        </pr>
                    </Link>                    
                </div>
            )}
            
            <ul className="login-menu">           
               {showModeratorBoard && (
                    <li className="item">
                        <Link to={"/mod"} className="link">
                            .MODERATOR
                        </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <li className="item">
                        <Link to={"/mod"} className="link">
                            .ADMIN
                        </Link>
                    </li>
                )}

                {currentUser ? (
                    <div>
                        <li className="item">
                            <Link to="/page" className="link">
                                .PAGE
                            </Link>
                        </li>

                        <li className="item">
                            <Link to={"/files"} className="link">
                                .TIMELINE
                            </Link>
                        </li> 

                        <li className="item">
                            <Link to={"/profile"} className="link">
                                .PROFILE
                            </Link>
                        </li>

                        <li className="item">
                            <Link to={"/upload"} className="link">
                                .UPLOAD
                            </Link>
                        </li>

                        <li className="item">
                            <a href="/login" className="link" onClick={logOut}>
                                .LOGOUT
                            </a>
                        </li>
                    </div>
                    ) : (
                    <div>
                        <li className="item">
                            <Link to={"/login"} className="link">
                                .LOGIN
                            </Link>
                        </li>

                        <li className="item">
                            <Link to={"/register"} className="link">
                                .SIGNUP
                            </Link>
                        </li>

                        <li className="item">
                            <Link to={"/about"} className="link">
                                .ABOUT
                            </Link>
                        </li>

                        <li className="item">
                            <Link to={"/contact"} className="link">
                                .CONTACT
                            </Link>
                        </li>
                    </div>
                )}
            </ul>             
        </div>
    );

};

export default Navbar;