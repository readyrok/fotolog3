import React, { Fragment, useState, useEffect } from "react";

import { motion } from 'framer-motion';
import './BoardUser.css';

import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        const LAST_PHOTO_INDEX = response.data.length - 1;
        const username = JSON.parse(localStorage.getItem("user"))["username"];

        setImages(Object.entries(response.data));
        setUrl(response.data[LAST_PHOTO_INDEX]["url"]);
        setDescription(response.data[LAST_PHOTO_INDEX]["description"]);
        setUsername(JSON.parse(localStorage.getItem("user"))["username"]);
        setId(response.data[LAST_PHOTO_INDEX]["id"]);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <Fragment>
      <div className="page-header">{username.toUpperCase()}</div>
      <div className="img-grid">
      {images.map((photo) => {
          
					return (
						<motion.div
							className="img-grid-wrap"
							key={photo[1].id}
							layout
							whileHover={{ opacity: 1 }}
							onClick={() => setSelected(photo[1].url)}
						>
							<motion.img
								src={photo[1].url}
								alt="parking"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.05 }}
							/>
						</motion.div>
					);
				})}
      </div>
    </Fragment>
    
  );
};

export default BoardUser;