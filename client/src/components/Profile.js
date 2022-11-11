import React from "react";
import AuthService from "../services/auth.service";
import './Profile.css';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const username = currentUser.username.toUpperCase();

  return (
    <div className="background">
      <div className="profile-header">
          <p>
            .{username}
          </p>
      </div>
      <div className="profile">
        <p>
          <strong>.ID</strong> {currentUser.id}
        </p>
        <p>
          <strong>.EMAIL</strong> {currentUser.email}
        </p>
        <p>
          <strong>.AUTHORITIES</strong>
        </p>
        <ul className="role-list">
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>.{role}</li>)}
        </ul>
      </div>      
    </div>
  );
};

export default Profile;