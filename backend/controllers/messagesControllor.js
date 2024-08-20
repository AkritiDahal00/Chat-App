const msgModels = require("../models/msgModels");

module.exports.addMessage = async (req, res, next) => {

    try{
        const {from, to, message } = req.body;
        const data =await msgModels.create({
            message: {text: message},
            users: [from, to],
            sender: from,
        });
        if (data) return res.json({msg:"Messages added Successfully"});
        else return res.json({msg:"Failed to add message to database"});
    }
    catch(ex){
        console.log(ex);
        next(ex);
    }
}

module.exports.getAllMessage = async (req, res, next) => {
    try{
        const {from, to} =req.body;
        const messages =await msgModels.find({
            users:{
                $all: [from, to],
            },
        }).sort({updatedAt: 1});

        const projectMessages = messages.map((msg)=>{
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });

        return res.json(projectMessages);
    }
    catch(ex){
        next(ex);
    }
}