import { useEffect, useState } from "react";
import ForumPostList from "./ForumPostList";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function ForumPost() {
  const [discussBoard, setDiscussBoard] = useState();
  const [isAddPost, setIsAddPost] = useState(false);
  const [isMessage, setMessage] = useState("");
  const [userData, setUserData] = useState();
  const userId = useParams().id;
  const postId = useParams().postid;
  async function getUserData(id) {
    let content = { id: id };
    await fetch("http://localhost:9000/profile/isUser", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }
  useEffect(() => {
    getUserData(userId);
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:9000/profile/forum/${postId}`)
      .then((res) => res.json())
      .then((text) => setDiscussBoard(text))
      .catch((err) => console.log(err));
  }, [postId]);

  const onSubmit = (e) => {
    const newUserPost = {
      user: userData.result.username
        .stringValue,
      message: isMessage.toString(),
    };
    addNewPost(newUserPost);
  };

  const addNewPost = (newlyPosted) => {
    axios
      .put(`http://localhost:9000/profile/forum/${postId}`, newlyPosted)
      .then((res) => res.json())
      .then((text) => console.log(text))
      .catch((err) => console.log(err));
  };

  const setNewPost = (e) => {
    setIsAddPost(!isAddPost);
  };
  return (
    <>
      {discussBoard ? (
        <div>
          <h1>{discussBoard.message}</h1>
        </div>
      ) : null}
      {discussBoard
        ? discussBoard.posts.map((doc, index) => (
          <div key={index}>
            <ForumPostList
              user={doc.user}
              message={doc.message}
              likes={doc.likes}
            />
          </div>
        ))
        : null}
      <div>
        <button onClick={setNewPost}>New post </button>
        {isAddPost ? (
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
      </div>
    </>
  );
}
