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

router.get("/checkUser", async (req, res, next) => {
    const allDocData = [];
  const docs = await getDocs(collection(db, "users"))
  docs.forEach((doc) => allDocData.push(doc.data()))
  let index = 0;
  docs.forEach((doc) => {
        allDocData[index].id = doc.id
        index++;
  })
  console.log(allDocData)
  res.json({result: allDocData})

})

//verifying user on homepage
router.put("/isUser", async (req, res, next) => {
    const currentUser = await getDoc(doc(db, "users", req.body.id))
    res.json({result: currentUser})
})

module.exports = router;