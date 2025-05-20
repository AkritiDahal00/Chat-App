const {register, login, setimage,getAllUser,logOut} = require("../controllers/UserController");
const express = require('express');
const multer = require('multer');
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id",getAllUser);
router.get("/logout/:id", logOut);

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage });

// Route to handle image upload
router.post('/setimage/:id', upload.single('image'), setimage);
// router.post("/setimage", setimage);



module.exports=router;
 