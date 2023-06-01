import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Box, Container, TextField, Button, styled } from '@mui/material';
import Message from './Message';

const FixedBox = styled(Box)({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '10px', 
    height: '80px',
});

const ScrollableBox = styled(Box)({
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 180px)', 
});
    

const RelativeContainer = styled(Container)({
    position: 'relative',
    height: 'calc(100vh - 100px)', 
  });

function ChatDetail({ chatId }) {
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchChat(chatId);
  }, [chatId]);

  const fetchChat = async (chatId) => {
    const res = await fetch(`http://localhost:9000/chats/${chatId}`);

    const data = await res.json();

    if (res.status === 200) {
      setChat(data);
    } else {
      console.error(data.error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:9000/chats/${chatId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderId: '0WTleMI17BqXAplfke4T', text: message }) 
    });

    const data = await res.json();

    if (res.status === 200) {
      setMessage('');
      fetchChat(chatId);
    } else {
      console.error(data.error);
    }
  };

  return (
    <RelativeContainer>
      <ScrollableBox>
        {chat && chat.messages.map((message, index) => (
          <Message key={message.id} message={message} />
        ))}
      </ScrollableBox>

      <FixedBox component="form" onSubmit={sendMessage}>
        <TextField 
          variant="outlined" 
          margin="normal"
          fullWidth
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <Button type="submit" variant="contained" color="primary">Send</Button>
      </FixedBox>
    </RelativeContainer>
  );
}

export default ChatDetail;
