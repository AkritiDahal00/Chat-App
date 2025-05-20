const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true, 
         min :3,
         max:20,
         unique: true
         },
         email: { 
            type: String,
             required: true, 
             unique: true
             },
    password:  { 
        type: String, 
        required: true 
    },
    isImageSet:{
        type: Boolean,
        default:false,
    },
    isImage:{
        type: String,
        default:"",
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log('Entered Password:', enteredPassword); // Log entered password
    console.log('Stored Hashed Password:', this.password); // Log stored hashed password
    console.log('Password Match:', isMatch); // Log result of comparison
    return isMatch;
};

module.exports = mongoose.model('User', userSchema);
