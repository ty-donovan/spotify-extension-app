const express = require('express');
const router = express.Router();
const db = require('./firebase.js');
const { collection, doc: docRef, query, where, getDocs, addDoc, getDoc, Timestamp } = require("firebase/firestore");
const { orderBy } = require('firebase/firestore');

router.get('/', async (req,res) => {
    const {userId} = req.query;

    if(!userId){
        return res.status(400).json({error: "Missing user id"});
    }

    const formattedUserId = `/users/${userId}`;

    try {
        const chatsRef = collection(db, 'chats');
        const q = query(chatsRef, where('participants', 'array-contains', formattedUserId));
        const snapshot = await getDocs(q);
        // console.log('query: ',q);

        const chats = [];
        for (let doc of snapshot.docs) {
            const chat = {id: doc.id, ...doc.data()};
            const messagesSnapshot = await getDocs(collection(doc.ref, 'messages'));
            chat.messages = await Promise.all(messagesSnapshot.docs.map(async (doc) => {
                const message = {id: doc.id, ...doc.data()};
    
                // Parse the senderId to get the userId
                const userId = typeof message.senderId === 'string' ? 
                    message.senderId.split('/')[2] : // If senderId is a string
                    message.senderId._key.path.segments[1]; // If senderId is a DocumentReference
                // Fetch the user details
                const userRef = docRef(db, 'users', userId);
                const userDoc = await getDoc(userRef);
        
                // If the user document exists, include it in the message
                if (userDoc.exists()) {
                    message.sender = userDoc.data();

                }
        
                return message;
            }));
            chats.push(chat);
        }
        res.json(chats);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error fetching chats'});
    }
});

router.get('/:id', async (req, res) => {
    const chatId = req.params.id;
  
    try {
        const chatRef = docRef(db, 'chats', chatId);
        const chatDoc = await getDoc(chatRef);
    
        if (!chatDoc.exists()) {
          return res.status(404).json({error: "Chat not found"});
        }
    
        const chat = {id: chatDoc.id, ...chatDoc.data()};
    
        // Order messages by createdAt timestamp
        const messagesQuery = query(collection(chatRef, 'messages'), orderBy('createdAt'));
        const messagesSnapshot = await getDocs(messagesQuery);
        chat.messages = await Promise.all(messagesSnapshot.docs.map(async (messageDoc) => {
            //... same as before
        }));
    
        res.json(chat);
      } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error fetching chat'});
      }
});


router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
        const userRef = docRef(db, 'users', userId);  
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
            return res.status(404).json({error: "User not found"});
        }

        res.json(userDoc.data());
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error fetching user'});
    }
});


router.post('/:chatId/messages', async (req,res) => {
    const { chatId } = req.params;
    const { senderId, text } = req.body;

    if(!senderId || !text){
        return res.status(400).json({error: "Missing sender id or text"});
    }

    const formattedSenderId = `/users/${senderId}`;

    try {
        const messagesRef = collection(docRef(db, 'chats', chatId), 'messages');
        const newDoc = await addDoc(messagesRef, { senderId: formattedSenderId, text, createdAt: Timestamp.now() }); // add createdAt here
        
        res.json({message: "Message sent", id: newDoc.id});
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error sending message'});
    }
});
module.exports = router;
