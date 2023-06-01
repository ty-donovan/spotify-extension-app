import React from 'react';
import { Typography, Avatar, Grid } from '@mui/material';

function Message({ message }) {
  const isUser = message.senderId === '/users/0WTleMI17BqXAplfke4T'; // Replace with the senderId of the logged-in user
  
  return (
    <Grid container direction="column" alignItems={isUser ? "flex-end" : "flex-start"}>
      <Avatar alt={message.sender ? message.sender.name : 'Unknown'}>{message.sender ? message.sender.name[0] : '?'}</Avatar>
      <Typography variant="body1" align={isUser ? "right" : "left"} style={{margin: 8}}>
        {message.text}
      </Typography>
    </Grid>
  );
}

export default Message;
