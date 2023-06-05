import React, { useEffect, useState } from 'react';
import ChatListItem from './ChatListItem';

function ChatList({ onChatSelect }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    
    const res = await fetch('http://localhost:9000/chats?userId=0WTleMI17BqXAplfke4T'); 

    const data = await res.json();

    if (res.status === 200) {
        setChats(data);
      } else {
        console.error(data.error);
      }
  }   

  return (
        <div>
        {chats.map(chat => <ChatListItem key={chat.id} chat={chat} onChatSelect={onChatSelect} />)}
        </div>
    );
}

export default ChatList;

