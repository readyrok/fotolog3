import React, { Fragment, useState, useEffect } from "react";

import { motion } from 'framer-motion';

import UserService from "../services/user.service";

const Timeline = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    UserService.getTimeline().then(
      (response) => {
        setImages(Object.entries(response.data).reverse());
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
        <div className="mainPhotoContainer">
            <div className="timeline-grid">
                {images.map((photo) => {
                return (<motion.div
                    className="main-img-wrap"
                    key={photo[1].id}
                    layout
                    whileHover={{ opacity: 1 }}
                >
                    <motion.img
                    src={photo[1].url}
                    alt="last one"
                    id="mainPhoto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    />
                    </motion.div>);})}
            </div>
            
        </div>
      </div>
    </Fragment>
    
  );
};

export default Timeline;