import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import { Link, Outlet, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import "@github/details-menu-element";
import "./HomePage.css";
import useWindowSize from "./useWindowSize";
import lowResLogo from "./logo-low-res-cropped.png";
export default function NavigationBar() {
  const size = useWindowSize();

  const params = useParams();
  const userId = params.id;
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState();

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
    if (userData)
      setCurrentUser({
        username:
          userData.result._document.data.value.mapValue.fields.username
            .stringValue,
      });
  }, [userData]);

  return (
    <>
      <AppBar style={{ backgroundColor: "#363535" }}>
        <Toolbar>
          {size.width > 600 && (
            <IconButton
              component={Link}
              to={"/" + userId + "/home"}
              style={{ width: "4%" }}
            >
              {/* <HomeIcon sx={{ color: 'white' }} /> */}
              <img src={lowResLogo} alt="Spots logo" />
            </IconButton>
          )}
          {size.width > 600 && (
            <ButtonGroup disableElevation>
              <Button
                className="navButtons"
                sx={{
                  color: "white",
                  backgroundColor: "#363535",
                  border: "none",
                }}
                component={Link}
                to={"/" + userId + "/discover"}
              >
                Discover
              </Button>
              <Button
                className="navButtons"
                sx={{
                  color: "white",
                  backgroundColor: "#363535",
                  border: "none",
                }}
                component={Link}
                to={"/" + userId + "/forum"}
              >
                Forum
              </Button>
              <Button
                className="navButtons"
                sx={{
                  color: "white",
                  backgroundColor: "#363535",
                  border: "none",
                }}
                component={Link}
                to={"/" + userId + "/yourTastes"}
              >
                Your Tastes
              </Button>
            </ButtonGroup>
          )}
          {size.width <= 600 && (
            <details style={{ width: "20%" }}>
              <summary className="summary">
                {
                  <img
                    src={lowResLogo}
                    style={{ justifySelf: "center", width: "45%" }}
                    alt="Spots logo"
                  />
                }
                {<h4>Navigate</h4>}
              </summary>
              <details-menu
                role="menu"
                class="dropdown-menu"
                style={{ backgroundColor: "#e3dfde" }}
              >
                <Button
                  sx={{ color: "black", textAlign: "center" }}
                  component={Link}
                  to={"/" + userId + "/home"}
                >
                  Home
                </Button>
                <Button
                  sx={{ color: "black" }}
                  component={Link}
                  to={"/" + userId + "/discover"}
                >
                  Discover
                </Button>
                <Button
                  sx={{ color: "black", textAlign: "center" }}
                  component={Link}
                  to={"/" + userId + "/yourTastes"}
                >
                  Your Tastes
                </Button>
                <Button
                  sx={{ color: "black", textAlign: "center" }}
                  component={Link}
                  to={"/" + userId + "/forum"}
                >
                  Forum
                </Button>
              </details-menu>
            </details>
          )}
          <Box sx={{ flexGrow: 1 }}></Box>
          {!currentUser ? (
            <p></p>
          ) : (
            <details>
              {size.width > 600 && <summary>{currentUser.username}</summary>}
              <summary></summary>
              <details-menu
                role="menu"
                class="dropdown-menu dropdown-menu-sw"
                style={{ backgroundColor: "#e3dfde" }}
              >
                <Button
                  sx={{ color: "black" }}
                  component={Link}
                  to={"/" + userId + "/profile"}
                >
                  Profile
                </Button>
                <Button
                  sx={{ color: "black" }}
                  component={Link}
                  to={"/" + userId + "/inbox"}
                >
                  Inbox
                </Button>
                <IconButton component={Link} to={"/"} className="logoutButton">
                  <LogoutIcon sx={{ color: "black" }} />
                </IconButton>
              </details-menu>
            </details>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet context={currentUser} />
    </>
  );
}
