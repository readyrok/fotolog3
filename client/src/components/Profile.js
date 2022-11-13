import React from "react";
import AuthService from "../services/auth.service";
import './Profile.css';
import { Link } from "react-router-dom";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const username = currentUser.username.toUpperCase();
  const email = currentUser.email.toUpperCase();

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="background">
      <div className="profile-header">
          <p>
            .{username}
          </p>
      </div>
      <div className="profile">
        <p>
          <strong>.INFO:</strong>
          <p className="info">AS THE WORLD TURNS I SPREAD LIKE GERMS.</p>
        </p>
        <p>
          <strong>.EMAIL:</strong>
          <p className="info">{email}</p>
        </p>
        <p>
          <strong>.SITE: </strong>
          <p className="info">
            <Link to={"#"} onClick = {() => openInNewTab("http://instagram.com/ready.rok/")}  className="link info">
              @READY.ROK
            </Link>
          </p> 
          <p>
            <Link to={"#"} onClick = {() => openInNewTab("http://instagram.com/ready.rok/")} className="link info">
              @READYROK.COM
            </Link>
          </p>         
        </p>
        <ul className="role-list">
          <li className="item" id="edit">
              <Link to={"/edit-profile"} className="link">
                  .EDIT PROFILE
              </Link>
          </li>
        </ul>
      </div>      
    </div>
  );
};

export default Profile;