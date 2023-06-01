import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatDetail from './ChatDetail';
import { Grid, Box, Paper, styled } from '@mui/material';

const FullHeightPaper = styled(Paper)({
    height: 'calc(100vh - 64px - 20px)', // Subtract the height with the top margin you want
    overflow: 'auto',
    marginTop: '20px', 
});

const FullHeightGrid = styled(Grid)({
    height: 'calc(100vh - 64px)', 
});

function InboxPage() {

  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
  };


  return (
    <FullHeightGrid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FullHeightPaper elevation={3}>
            <ChatList onChatSelect={handleChatSelect} />
          </FullHeightPaper>
        </Grid>
        <Grid item xs={12} md={8}>
          <FullHeightPaper elevation={3}>
            {selectedChatId && <ChatDetail chatId={selectedChatId} />}
          </FullHeightPaper>
        </Grid>
    </FullHeightGrid>
  );
}

export default InboxPage;
