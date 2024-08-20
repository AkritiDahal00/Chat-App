const User =require("../models/UserModels");
const bcrypt = require("bcrypt");
//const fs = require('fs');
const path = require('path');


// yo chai login form ko laggi ho
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.json({ status: false, msg: 'Incorrect Email and Password' });
        }

        const isPasswordMatch = await user.matchPassword(password);

        if (!isPasswordMatch) {
            return res.json({ status: false, msg: 'Incorrect Email and Password' });
        }

        res.json({ status: true, user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: false, msg: 'Server error' });
    }
};
// yo chai register ko lagi ho
module.exports.register = async (req,res,next)=>{
  const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ status: false, msg: 'Email already exists' });
        }

        const user = new User({ name, email, password });
        await user.save();
        console.log('Registered User:', user); // Log the user object

        res.json({ status: true, user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ status: false, msg: 'Server error' });
    }
};




   //yo chai userko image set garna ko lagiho
   module.exports.setimage = async (req, res) => {
      try {
        const { id } = req.params;
        const imagePath = req.file.path;
    
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ status: false, msg: 'User not found' });
        }
    
        user.isImage = imagePath;
        user.isImageSet = true;
        await user.save();
    
        res.json({ status: true, imageUrl: imagePath });
      } catch (error) {
        res.status(500).json({ status: false, msg: 'Error setting image', error: error.message });
      }
    };

    module.exports. getAllUser= async (req,res,next)=>{
      try{
         const users =await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "name",
            "isImage",
            "_id",
         ]);
         return res.json(users);
      }
      catch(error){
        return res.status(500).json({ error: error.message });
         next(ex);
      }
    };
