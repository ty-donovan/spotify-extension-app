import PostedBoard from "./ForumListDiscussion";
import React, { useState, useEffect } from "react";
import "./ForumPage.css";

export default function FilterSearch({ searchUser }) {
  const [isPosts, setPosts] = useState();

  return (
    <>
      {searchUser.length === 0 ? (
        <>
          <h1> No results</h1>
        </>
      ) : (
        <>
          {Object.keys(searchUser).map((key, index) => (
            <div key={index} className="container">
              <PostedBoard
                name={searchUser[key].user}
                message={searchUser[key].message}
                likes={searchUser[key].likes}
                dislikes={searchUser[key].dislikes}
                id={searchUser[key].id}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
}
