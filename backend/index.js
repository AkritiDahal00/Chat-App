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
const {decrypt} = require('./crypto');

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
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
      global.onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", async (data) => {
      const sendUserSocket = global.onlineUsers.get(data.to);
      if (sendUserSocket) {
          socket.to(sendUserSocket).emit("receive-message", data.message);
      } else {
          // If recipient is offline, send email notification
          const sender = await User.findById(data.from);
          const receiver = await User.findById(data.to);
          if (sender && receiver) {
              const subject = `New Message from ${sender.name}`;
              const text = `${sender.name} sent you a message: "${data.message}"`;
              
              const encryptedText = data.message;
              // Send email from the central email address
              await sendEmailFromSender(receiver.email, subject, encryptedText);
          }
      }
  });
});


const sendEmailFromSender = async (recipientEmail, subject, encryptedText) => {
  try {
    const decryptedText = decrypt(encryptedText);
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'akritidahal000@gmail.com', // Central email address
              pass: process.env.EMAIL_PASS,    // Password for the central email address
          },
      });

      await transporter.sendMail({
          from: 'akritidahal000@gmail.com', // Central email address
          to: recipientEmail,
          subject: subject,
          text: decryptedText,
      });
  } catch (error) {
      console.log('Error sending email:', error);
  }
};