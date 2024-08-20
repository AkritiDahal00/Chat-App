const express=require("express");

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const multer = require('multer');
const path =require("path");
const cors =require('cors');
// const bcrypt = require('bcryptjs');
const UserRoutes =require("./routes/UserRoutes");
const MessagesRoute =require("./routes/MessagesRoute");
const socket = require("socket.io");
const nodemailer = require('nodemailer');
const User = require('./models/UserModels');


const app = express();
require ("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/api/auth", UserRoutes);
app.use("/api/messages", MessagesRoute);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB Connection Successful");
}).catch((err)=>{
    console.log(err.message);
});

  

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const server =app.listen(process.env.PORT,()=>{

console.log(`Server Started on Port${process.env.PORT}`);
});

const io = socket(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {

    global.chatSocket =socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg",async (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("receive-message", data.message);
        }
        else{
            //if rexeiver offline xa vaney ,msg send hunxa email through
            // database bata sender ra receiver ko data fetch garxa
            const sender =await User.findById(data.from);
            const receiver =await User.findById(data.to);
            if(sender && receiver) {
                const subject = `New Message from ${sender.name}`;
                const text = ` ${sender.name} sent you a message :"${data.message}"`;
                console.log(subject);
                console.log(text);

                //send email from sender to receiver
                await sendEmailFromSender (sender.email , receiver.email, subject, text);
            }
        }
    })
});


const sendEmailFromSender = async (senderEmail, recipientEmail, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: senderEmail,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      await transporter.sendMail({
        from: senderEmail,
        to: recipientEmail,
        subject: subject,
        text: text,
      });
    } catch (error) {
      console.log('Error sending email:', error);
    }
  };
