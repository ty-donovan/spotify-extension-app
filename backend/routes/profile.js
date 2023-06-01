const express = require("express")
const router = express.Router()
const { db, storage } = require("./firebase")
const fileUpload = require('express-fileupload')
const { getDocs, collection, doc, getDoc, updateDoc } = require("firebase/firestore");
const { ref, uploadBytes } = require("firebase/storage");
const fs = require("fs");
const bodyParser = require("body-parser");

router.use(fileUpload());
let userId;

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
    res.json({ result: allDocData })

})

//verifying user on homepage
router.put("/isUser", async (req, res, next) => {
    const user = await getDoc(doc(db, "users", req.body.id))
    const currentUser = user.data();
    userId = user.id;
    res.json({ result: currentUser })
})

//uploading profile picture
router.post("/upload", async (req, res, next) => {
    bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
        (req, res) => {
            try {
                console.log(req.body);
                fs.writeFile("image.jpeg", req.body, (error) => {
                    if (error) {
                        throw error;
                    }
                });

                res.sendStatus(200);
            } catch (error) {
                res.sendStatus(500);
            }
        }
    // console.log(req.body);
    // if (!userId) {
    //     res.redirect('back');
    // }
    // const imageRef = ref(storage, 'profilePictures/' + userId)
    // uploadBytes(imageRef, req.body)

    // res.redirect('http://localhost:3000/' + userId + '/profile');

})

//editing profile info
router.put("/edit-profile", async (req, res, next) => {
    await updateDoc(doc(db, "users", userId), {
        displayName: req.body.displayName,
        bio: req.body.bio,
        favoriteArtist: req.body.favoriteArtist,
        favoriteSong: req.body.favoriteSong,
        favoriteAlbum: req.body.favoriteAlbum
    })
    res.sendStatus(200);
})

//making profile public/private
router.put("/make-public", async (req, res, next) => {
    await updateDoc(doc(db, "users", userId), {
        isPublic: req.body.isPublic
    })
    res.sendStatus(200);
})

module.exports = router;