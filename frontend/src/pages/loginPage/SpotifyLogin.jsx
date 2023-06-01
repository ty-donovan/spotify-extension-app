import React from "react";

function SpotifyLogin() {

  const onClick = (e) => {
    // URL path to localhost:9000 set in "proxy" in package.json
    fetch("http://localhost:9000/auth")
      .then((res) => res.json())
      .then((data) => {
        window.open(data.url);
      });
  };

  return (
    <button onClick={(e) => onClick(e)}>Log In</button> 
  );
}
    

export default SpotifyLogin;