import React, { useState, useEffect } from "react";
import "./ForumPage.css";
import axios from "axios";
import ForumList from "./ForumList";

export default function Forum() {
  //Search bar
  //Create new discussion board here or... in another file?
  //This should be pretty bare, all I'll need here is to get the user info somehow
  const [newPost, setNewPost] = useState(false);
  const [isMessage, setMessage] = useState();
  let user = "DioTest";

  const onSubmit = (e) => {
    const newUserPost = {
      user: user,
      message: isMessage.toString(),
      likes: 0,
      posts: [],
    };
    postNewPost(newUserPost);
  };
  const postNewPost = (newUserPost) => {
    axios
      .post("http://localhost:9000/profile/forum", newUserPost)
      .then((res) => res.json())
      .then((text) => console.log(text))
      .catch((err) => console.log(err));
  };

  const newMessage = (e) => {
    setNewPost(true);
  };
  return (
    <>
      <div className="average-grade">
        <h1>Welcome to the Forum</h1>
      </div>
      <button onClick={newMessage}>Add New Post</button>
      {newPost ? (
        <form onSubmit={onSubmit}>
          <label>
            New Post:
            <br></br>
            <input
              type="text"
              value={isMessage}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
      ) : null}
      <ForumList />
    </>
  );
}
