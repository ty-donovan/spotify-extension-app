import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import Message from './Message';

function ChatDetail({ match }) {
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchChat();
  }, []);

  const fetchChat = async () => {
    const res = await fetch(`http://localhost:9000/chats/${id}`);

    const data = await res.json();

    if (res.status === 200) {
      setChat(data);
    } else {
      console.error(data.error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:9000/chats/${id}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderId: '0WTleMI17BqXAplfke4T', text: message }) 
    });

    const data = await res.json();

    if (res.status === 200) {
      setMessage('');
      fetchChat();
    } else {
      console.error(data.error);
    }
  };

  return (
    <Container>
      {chat && chat.messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
      
      <Box component="form" onSubmit={sendMessage} mt={2}>
        <TextField 
          variant="outlined" 
          margin="normal"
          fullWidth
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <Button type="submit" variant="contained" color="primary">Send</Button>
      </Box>
    </Container>
  );
}

export default ChatDetail;
