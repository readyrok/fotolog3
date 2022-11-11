import React, { Fragment, useState, useEffect } from "react";

import { motion } from 'framer-motion';

import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        const LAST_PHOTO_INDEX = response.data.length - 1;
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
      <div className="container">
        <header className="jumbotron">
          <h1>{username} </h1>
        </header>
        <div className="mainPhotoContainer">
          <motion.div
                className="main-img-wrap"
                key={id}
                layout
                whileHover={{ opacity: 1 }}
              >
              <motion.img
                src={url}
                alt="last one"
                id="mainPhoto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 }}
              />
          </motion.div>
        </div>
        <div className="grid-container">
          <div className="img-grid">
            {images.map((photo) => {
              return (<motion.div
                className="img-wrap"
                key={photo[1].id}
                layout
                whileHover={{ opacity: 1 }}
                onClick={() => setUrl(photo[1].url)}
              >
                <motion.img
                  src={photo[1].url}
                  alt="parking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                />
              </motion.div>);})}
          </div>
        </div>
      </div>
      {/* {selected && (
				<Modal
					selected={selected}
					setSelected={setSelected}
				/>
			)}     */}
    </Fragment>
    
  );
};

export default BoardUser;