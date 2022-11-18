import React, {useEffect, useState} from 'react';
import './Modal.css';
import {motion} from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Link} from 'react-router-dom';
import UserService from '../services/user.service';

const Modal = ({selected, setSelected, id, setId}) => {
    const [liked, setLiked] = useState(false);
    let [likeCount, setLikeCount] = useState(0)
    const LIKE_URL = "/files/likes/" + id;

    useEffect(() => {
        UserService.countLikes(id).then(
            (response) => {
                setLikeCount(response.data);
            }
        )
    }, [id]);


    useEffect(()=>{
        UserService.isPostLiked(id).then(
            (response) => {
                if(response.data===true){
                    setLiked(true);
                }else{
                    setLiked(false);
                }
            }
        )
    }, [id])

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelected(null);
            setId(null);
        }        
    }

    const handleLike = (e) => {
        e.preventDefault();
        if(liked === false){
            UserService.saveLike(id);
            setLiked(true);
            let newLikeCount = likeCount++;
            setLikeCount(newLikeCount);
        }else{
            UserService.deleteLike(id);
            setLiked(false);
            let newLikeCount = likeCount--;
            setLikeCount(newLikeCount);
        }
    }

    return (
        <motion.div className="backdrop" onClick={handleClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}>
            <motion.img src={selected} alt="zoomed"
                initial={{y: "-100vh"}}
                animate={{y: 0}}/>
            <motion.div className="img-modal-info"
                initial={{y: "-100vh"}}
                animate={{y: 0}}>
                <Link to={LIKE_URL} onClick={handleLike}>
                    <button className="modal-btn" id="like-post">
                        {liked === false && (
                            <FavoriteBorderIcon className="like-heart"/>
                        )}
                        {liked === true && (
                            <FavoriteIcon className="like-heart"/>
                        )}
                        {/* <div className="like-count">{likeCount}</div> */}
                    </button>
                </Link>
                <Link>
                    <button className="modal-btn" id="comments-post">
                        .COMMENTS(0)
                    </button>
                </Link>
                <Link>
                    <button className="modal-btn" id="edit-post">
                        .EDIT
                    </button>
                </Link>
                <Link>
                    <button className="modal-btn" id="delete-post">
                        .DELETE
                    </button>
                </Link>
            </motion.div>
        </motion.div>
    )
}

export default Modal;