import React from 'react';
import { Typography, Avatar, Grid } from '@mui/material';

function Message({ message, isFirstMessage }) {
  const isUser = message.senderId === '/users/0WTleMI17BqXAplfke4T'; 
  
  return (
    <Grid container direction="column" alignItems={isUser ? "flex-end" : "flex-start"} 
          style={{paddingTop: isFirstMessage ? '20px' : '0px'}}>
      <Avatar alt={message.sender ? message.sender.name : 'Unknown'}>{message.sender ? message.sender.name[0] : '?'}</Avatar>
      <Typography variant="body1" align={isUser ? "right" : "left"} style={{margin: 8}}>
        {message.text}
      </Typography>
    </Grid>
  );
}

export default Message;
