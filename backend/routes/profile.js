const express = require("express")
const router = express.Router()
const db = require("./firebase")

const {getDocs, collection, query, where, doc, getDoc} = require("firebase/firestore");

//checking entered username and password
async function userAndPasswordMatch( username, password ) {
    const users = collection(db, 'users')
    console.log(users)
    const q = query(users, where('username', '==', username), where('password', '==', password))
    const querySnapshot = await getDocs(q)
    let currentUser;
    querySnapshot.forEach((doc) => {
        currentUser = doc.id;
        return currentUser;
    });
    return false;
}

router.get("/likes", async (req, res, next) => {
  const allMessagesData = [];
  const docs = await getDocs(collection(db, "discussionBoard"));
  docs.forEach((doc) => {
    let data = doc.data();
    allMessagesData.push({
      id: doc.id,
      likes: data.likes,
      dislikes: data.dislikes,
    });
  });
  res.json({ allMessagesData });
});

router.get("/checkUser", async (req, res, next) => {
  const allDocData = [];
  const docs = await getDocs(collection(db, "users"));
  docs.forEach((doc) => allDocData.push(doc.data()));
  let index = 0;
  docs.forEach((doc) => {
    allDocData[index].id = doc.id;
    index++;
  });
  res.json({ result: allDocData });
});

//verifying user on homepage
router.put("/isUser", async (req, res, next) => {
    const currentUser = await getDoc(doc(db, "users", req.body.id))
    res.json({result: currentUser})
})

//setting hasPic
router.put("/has-pic", async (req, res) => {
    await updateDoc(doc(db, "users", userId), {
        hasPic: req.body.hasPic
    })
})
module.exports = router;


module.exports = router;