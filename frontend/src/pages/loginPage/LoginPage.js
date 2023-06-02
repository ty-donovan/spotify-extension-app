import "./LoginPage.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Snackbar,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";

function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  async function getUsers() {
    await fetch("http://localhost:9000/profile/checkUser")
      .then((response) => response.json())
      .then((data) => setAllUsers(data))
      .catch((error) => console.log("Error:", error));
  }
  const changeUsername = (e) => {
    setUsername(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleShowError = () => {
    setShowError(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
  };

  const attemptLogin = (event) => {
    event.preventDefault();
    userAndPasswordMatch(username, password);
  };

  if (currentUser) return <Navigate to={"/" + currentUser + "/home"} />;
  return (
    <>
      {!allUsers ? (
        <p1></p1>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Welcome to Spots</h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mt: "25vh",
              mx: "40%",
            }}
          >
            <form
              onSubmit={attemptLogin}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Log in</Typography>
              <TextField
                error={showError}
                label="Username"
                onChange={changeUsername}
                sx={{ width: "150%", m: "5%" }}
              />
              <TextField
                error={showError}
                label="Password"
                onChange={changePassword}
                type="password"
                sx={{ width: "150%", m: "5%" }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "80%", m: "5%" }}
              >
                Login
              </Button>
            </form>
            <Snackbar
              open={showError}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Incorrect username or password!
              </Alert>
            </Snackbar>
          </Box>
        </>
      )}
    </>
  );

  async function userAndPasswordMatch(username, password) {
    allUsers.result.forEach((user) => {
      if (user.username === username)
        if (user.password === password) {
          setCurrentUser(user.id);
          return true;
        }
    });
    handleShowError();
  }
}

export default LoginPage;
