import "./ForumPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
export default function DiscussionPosts({
  currentUser,
  name,
  message,
  likes,
  id,
  dislikes,
}) {
  const [allUsers, setAllUsers] = useState();
  if (currentUser) {
    currentUser = currentUser.result.username.stringValue;
  }

  const navigate = useNavigate();
  const location = useLocation();
  const goToPostPage = () => {
    navigate(`${location.pathname}/${id}`);
  };

  useEffect(() => {
    fetch(`http://localhost:9000/profile/likes`)
      .then((res) => res.json())
      .then((text) => {
        setAllUsers(text.allMessagesData);
      })
      .catch((err) => console.log(err));
  }, []);

  const addOrRemoveUpLikes = () => {
    console.log(allUsers);
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].id === id) {
        if (allUsers[i].likes.includes(currentUser)) {
          let pick = "removelikes";
          upvote(pick);
        } else {
          let pick = "addlikes";
          upvote(pick);
        }
      }
    }
  };

  const addOrRemoveDownLikes = () => {
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].id === id) {
        if (allUsers[i].dislikes.includes(currentUser)) {
          let pick = "removedislikes";
          downvote(pick);
        } else {
          let pick = "adddislikes";
          downvote(pick);
        }
      }
    }
  };

  const upvote = (addOrRemove) => {
    axios
      .put(`http://localhost:9000/profile/forum/${id}/${addOrRemove}`, {
        currentUser: currentUser,
      })
      .then((res) => res.json)
      .then((text) => console.log("text"))
      .catch((err) => console.log(err));
    navigate(0);
  };

  const downvote = (addOrRemove) => {
    axios
      .put(`http://localhost:9000/profile/forum/${id}/${addOrRemove}`, {
        currentUser: currentUser,
      })
      .then((res) => res.json())
      .then((text) => console.log(text))
      .catch((err) => console.log(err));
    navigate(0);
  };
  return (
    <>
      <div className="student-grade-row" onClick={goToPostPage}>
        <p> {name}</p>
        <p>{message}</p>
      </div>
      <button onClick={addOrRemoveUpLikes}>Likes: {likes.length}</button>
      <button onClick={addOrRemoveDownLikes}>Dislike: {dislikes.length}</button>
    </>
  );
}
