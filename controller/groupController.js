const groupModel = require('../models/groupModel');
const { ObjectId } = require('mongodb');

//ADD GROUP....
const addGroupController = async (req, res) => {
    try {
        const { name, user_id } = req.body;
        const result = await groupModel.create({ name: name, user_id: user_id });
        res.status(201).send({ status: "SUCCESS", "msg": "GROUP ADDED", data: result });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "FAILED", "msg": error, data: {} })
    }
}

//GET GROUP....
const getGroupController = async (req, res) => {
    try {
        const result = await groupModel.find({ user_id: new ObjectId(req.params.id) });
        res.status(200).send({ status: "SUCCESS", "msg": "SUCCESS", data: result });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "FAILED", "msg": error, data: {} })
    }
}


const DeleteGroupController = async (req, res) => {
    try {
        const result = await groupModel.deleteOne({ _id: new ObjectId(req.params.id) });
        res.status(200).send({ msg: "DELETE SUCCESSFULLY", error: {}, data: result });
    } catch (error) {
        res.status(400).send({ msg: "DELETE FAILED", error: error, data: {} });
    }
};

const UptadeGroupController = async (req, res) => {
    try {
        const contactid = new ObjectId(req.params.id);
        const value = req.body;
        const result = await groupModel.updateOne({ _id: contactid }, { $set: value }
        );
        res.status(200).send({ msg: "SUCCESS", error: {}, data: result });
    } catch (error) {
        res.status(400).send({ msg: "FAILES", error: error, data: {} });
    }
};

module.exports = { addGroupController, getGroupController, DeleteGroupController, UptadeGroupController }



