const {addMessage, getAllMessage} = require("../controllers/messagesControllor");
const express = require('express');
const router = express.Router();



router.post("/addmsg/", addMessage);
router.post("/getmsg/", getAllMessage);


module.exports=router;
 