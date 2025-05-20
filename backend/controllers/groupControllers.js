const Group = require('../models/groupModels');
const User = require('../models/UserModels');

module.exports.createGroup = async (req, res, next) => {
    try {
        const { name, createdBy, members } = req.body;
        const group = await Group.create({
            name,
            createdBy,
            members,
        });
        res.json({ status: true, group });
    } catch (error) {
        next(error);
    }
};

module.exports.addMemberToGroup = async (req, res, next) => {
    try {
        const { groupId, memberId } = req.body;
        const group = await Group.findByIdAndUpdate(
            groupId,
            { $push: { members: memberId } },
            { new: true }
        );
        res.json({ status: true, group });
    } catch (error) {
        next(error);
    }
};

module.exports.getGroupDetails = async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId).populate('members');
        res.json({ status: true, group });
    } catch (error) {
        next(error);
    }
};
