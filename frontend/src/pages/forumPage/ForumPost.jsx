import { useEffect, useState } from "react";
import ForumPostList from "./ForumPostList";
import axios from "axios";
export default function ForumPost() {
  const [postId, setPostId] = useState("Uj0Ve2fJELzvqU7FhPqZ");
  const [discussBoard, setDiscussBoard] = useState();
  const [isAddPost, setIsAddPost] = useState(false);
  const [isMessage, setMessage] = useState();
  let user = "Real Test";
  useEffect(() => {
    fetch(`http://localhost:9000/profile/forum/${postId}`)
      .then((res) => res.json())
      .then((text) => setDiscussBoard(text))
      .catch((err) => console.log(err));
  }, [postId]);

  const onSubmit = (e) => {
    const newUserPost = {
      user: user,
      message: isMessage.toString(),
      likes: 0,
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
