import React, { Fragment, useState, useEffect } from "react";

import { motion } from 'framer-motion';

import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        const images = Object.entries(response.data);

        setContent(images);
        setUrl(response.data[response.data.length - 1]["url"]);
        setDescription(response.data[response.data.length - 1]["description"]);
        setUsername(JSON.parse(localStorage.getItem("user"))["username"]);
        setId(response.data[response.data.length - 1]["id"]);
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
  }, [url, description]);

  // for (let i = 0; i < content.length; i++) {
  //   setImages(content[i]);
  //   console.log(content[i]);
  //   console.log("aici");
  // }

  return (
    <Fragment>
      <div className="container">
        <header className="jumbotron">
          <h1>{username} </h1>
        </header>
        <div className="mainPhotoContainer">
          <motion.div
                className="img-wrap"
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
        {/* <div className="img-grid">
          {content.array.forEach(element => {
            return (<div>{element}</div>)
          })}
        </div> */}
      </div>
      {/* <div className="img-grid">
				{content.map((photo) => {
					console.log(photo)
					return (<motion.div
            className="img-wrap"
            key={photo.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelected(photo.url)}
          >
            <motion.img
              src={photo.url}
              alt="parking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
            />
          </motion.div>);})}
      </div> */}
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