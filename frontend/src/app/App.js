import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/loginPage/LoginPage';
import HomePage from '../pages/homePage/HomePage'
import NavigationBar from '../pages/homePage/NavigationBar';
import ForumPage from '../pages/forumPage/ForumPage';
import InboxPage from '../pages/inboxPage/InboxPage';
import LikedSongsPage from '../pages/likedSongsPage/LikedSongsPage';
import ProfilePage from '../pages/profilePage/ProfilePage';
import TopArtistsPage from '../pages/topArtistsPage/TopArtistsPage';
import TopSongsPage from '../pages/topSongsPage/TopSongsPage';
import DiscoverPage from '../pages/discoverPage/DiscoverPage';
import OtherUserPage from '../pages/otherUserPage/OtherUserPage';
import YourTastesPage from '../pages/yourTastesPage/YourTastesPage';
import ForumPost from "../pages/forumPage/ForumPost";
import AccessTokenProvider from '../accessTokenContext';
import ChatDetail from '../pages/inboxPage/ChatDetail';

function App() {
  return (
    <AccessTokenProvider>
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<LoginPage />} />
           <Route path="/:id" element={<NavigationBar />}>
               <Route path="/:id/home" element={<HomePage />} />
               <Route path="/:id/forum" element={<ForumPage />} />
               <Route path="/:id/forum/:postid" element={<ForumPost />} />
               <Route path="/:id/inbox" element={<InboxPage />} />
               <Route path="/:id/likedSongs" element={<LikedSongsPage />} />
               <Route path="/:id/profile" element={<ProfilePage />} />
               <Route path="/:id/topArtists" element={<TopArtistsPage />} />
               <Route path="/:id/topSongs" element={<TopSongsPage />} />
               <Route path="/:id/discover" element={<DiscoverPage />} />
               <Route path="/:id/:otherId/otherUser" element={<OtherUserPage />} />
               <Route path="/:id/yourTastes" element={<YourTastesPage />} />
           </Route>
       </Routes>
    </BrowserRouter>
    </AccessTokenProvider>
  );
}

export default App;

