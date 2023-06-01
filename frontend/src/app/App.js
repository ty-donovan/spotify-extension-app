import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import InboxPage from '../pages/inboxPage/InboxPage';
import ChatDetail from '../pages/inboxPage/ChatDetail';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center' }}>
        <header>
          <Routes>
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/chats/:id" element={<ChatDetail />} />
            </Routes>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          <Link to="/inbox">Go to Inbox</Link>
        </header>
      </div>
    </Router>
  );
}

export default App;
