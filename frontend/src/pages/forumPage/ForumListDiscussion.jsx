import "./ForumPage.css";
import React, { useState, useEffect } from "react";

export default function DiscussionPosts({ name, message, likes, id }) {
  const [hasVoted, setHasVoted] = useState(false);
  const goToPostPage = () => {
    console.log(id);
  };

  const upvote = () => {
    if (!hasVoted) {
      console.log("check");
    }

    setHasVoted(true);
  };
  return (
    <>
      <div className="student-grade-row" onClick={goToPostPage}>
        <p>User: {name}</p>
        <p>Message: {message}</p>
        <p>Likes: {likes}</p>
        <button onClick={upvote}>Like?</button>
      </div>
    </>
  );
}
