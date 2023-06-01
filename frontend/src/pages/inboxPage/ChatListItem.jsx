import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledListItem = styled(ListItem)({
  borderBottom: '1px solid #ddd',
  '&:hover': {
    backgroundColor: '#f7f7f7',
  },
});

function ChatListItem({ chat }) {
  const [participants, setParticipants] = useState([]);
  const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

  useEffect(() => {
    async function fetchUserNames() {
      const userNames = [];
      for (let participantId of chat.participants) {
        const userId = participantId.split('/')[2]; // Extract user id from participantId
        const user = await fetchUserName(userId); // Fetch user details
        if (user && user.name) {
          userNames.push(user.name); // push the user's name to the array
        }
      }
      setParticipants(userNames); // update the state
    }

    fetchUserNames();
  }, [chat.participants]);

  async function fetchUserName(userId) {
    try {
      const response = await fetch(`http://localhost:9000/chats/user/${userId}`);
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <StyledListItem component={RouterLink} to={`/chats/${chat.id}`} button>
      <ListItemText
        primary={
          <Typography variant="h6">
            {participants.join(', ')}
          </Typography>
        }
        secondary={
          lastMessage && 
            <Typography variant="body2" color="textSecondary">
              Last message: {lastMessage.text}
            </Typography>
        }
      />
    </StyledListItem>
  );
}

export default ChatListItem;
