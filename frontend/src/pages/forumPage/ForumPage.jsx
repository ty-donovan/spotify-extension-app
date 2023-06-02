import React, { useState, useEffect } from "react";
import "./ForumPage.css";
import axios from "axios";
import ForumList from "./ForumList";
import FilterSearch from "./FilterSearch";
import { useParams } from "react-router-dom";

export default function Forum() {
  //Search bar
  //Create new discussion board here or... in another file?
  //This should be pretty bare, all I'll need here is to get the user info somehow
  const [newPost, setNewPost] = useState(false);
  const [isMessage, setMessage] = useState("");
  const [userData, setUserData] = useState();
  const [filterSearch, setFilterSearch] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [filteredCollection, setFilteredCollection] = useState([]);
  const userId = useParams().id;

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

  const onSubmit = (e) => {
    const newUserPost = {
      user: userData.result.username,
      message: isMessage.toString(),
      likes: [],
      dislikes: [],
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

  const handleSearch = async (event) => {
    setSearchString(event.target.value);
  };
  const handleEnteredSearch = async (event) => {
    if (event.key === "Enter") {
      // Prevent page refresh
      // SRC: https://stackoverflow.com/questions/50193227/basic-react-form-submit-refreshes-entire-page
      event.preventDefault();
      let nameArray = {
        user: searchString.split(" "),
      };
      let firstData = [];
      axios
        .post("http://localhost:9000/profile/forum/users", nameArray)
        .then((res) => {
          res.data.result.forEach((doc) => {
            firstData.push(doc);
          });
          setFilteredCollection(firstData);
          //firstData.push(res.data.result);
          //setFilteredCollection(firstData[0]);
        })
        .catch((err) => console.log(err));

      if (searchString.trim() === "") {
        // if they hit enter on empty field
        setFilterSearch(false);
        event.preventDefault();
      } else {
        // if they hit enter on non-empty field
        setFilterSearch(true);
        event.preventDefault();
      }
    }
  };

  return (
    <>
      <div className="forumPage">
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
        <div className="Search">
          <form>
            <label> Search Post by Username: </label>
            <input
              type="text"
              required
              value={searchString}
              onChange={handleSearch}
              onKeyDown={handleEnteredSearch}
            />
          </form>
        </div>
        <div>
          <h1
            style={{
              display: "flex",
              float: "left",
              padding: "0 0 0 100px",
            }}
          >
            User
          </h1>
          <h1
            style={{
              display: "flex",
              float: "right",
              padding: "0 100px 0 100px",
            }}
          >
            Message
          </h1>
          <br></br>
        </div>
        {filterSearch ? (
          <FilterSearch searchUser={filteredCollection} />
        ) : (
          <ForumList currentUser={userData} />
        )}
      </div>
    </>
  );
}
