import PostedBoard from "./ForumListDiscussion";
import React, { useState, useEffect } from "react";
import "./ForumPage.css";

export default function ForumPostList() {
  const [isPosts, setPosts] = useState();
  useEffect(() => {
    fetch("http://localhost:9000/profile/forum")
      .then((res) => res.json())
      .then((text) => setPosts(text.result))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {isPosts
        ? isPosts.map((doc, index) => (
            <div key={index}>
              <PostedBoard
                name={doc.user}
                message={doc.message}
                likes={doc.likes}
                id={doc.id}
              />
            </div>
          ))
        : null}
    </>
  );
}
