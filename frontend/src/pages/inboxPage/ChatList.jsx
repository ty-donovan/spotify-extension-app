import React, { useEffect, useState } from 'react';
import ChatListItem from './ChatListItem';

function ChatList() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    
    const res = await fetch('http://localhost:9000/chats?userId=0WTleMI17BqXAplfke4T'); 

    const data = await res.json();

    console.log('Data from server:', data); 
    console.log('Participants:', data.participants);
    console.log('Messages:', data.messages);

    if (res.status === 200) {
        setChats(data);
      } else {
        console.error(data.error);
      }
  }   

  return (
    <div>
      {chats.map(chat => <ChatListItem key={chat.id} chat={chat} />)}
    </div>
  );
}

export default ChatList;

