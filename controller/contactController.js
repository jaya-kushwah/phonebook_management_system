const contactModel = require('../models/contactModel');
const user = require('../models/contactModel');
const users = require('../models/userModel')
const { ObjectId } = require('mongodb');

//ADD CONTACT QUERY 
const addController = async (req, res) => {
    try {
        const { name, email, mobile, address, group, user_id } = req.body;
        console.log(name, email, mobile, address, group, user_id)
        const result = await user.create({ name: name, email: email, mobile: mobile, address: address, group: group, user_id: user_id })
        res.status(201).send({ msg: "USER INSERTED SUCCESSFULY", data: result })
    } catch (error) {
        res.status(400).send({ msg: "SOMETHIG WENT WRONG", data: " ", error: error });
    }
}

//GET CONTACT BY USERID OF ONE USER
const getController = async (req, res) => {
    try {
        const userId = await users.findOne({ _id: new ObjectId(req.params.id) });
        if (userId) {
            const result = await user.find({ user_id: userId });
            res.status(200).send({ msg: "SUCCESSFULL", error: {}, data: result });
        } else {
            res.status(400).send({ msg: "FAILED", error: "ENTER YOUR VALID ID", data: {} });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "FFAILED", error: error, data: {} });
    }
};

//DELETE CONTACT ONE QUERY
const DeleteController = async (req, res) => {
    try {
        const result = await contactModel.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result) {
            res.status(200).send({ msg: "CONTACT IS DELETE", error: {}, data: result });
        } else {
            res.status(400).send({ msg: "FAILED" });
        }
    } catch (error) {
        res.status(400).send({ msg: "SOMETHIG WENT WRONG", data: " ", error: error });
    }
}

//GETCONTACT BT ID
const getControllerById = async (req, res) => {
    try {
        const result = await contactModel.findOne({ _id: new ObjectId(req.params.id) });
        if (result) {
            res.status(200).send({ msg: "CONTACT", error: {}, data: result });
        } else {
            res.status(400).send({ msg: "FAILED" });
        }
    } catch (error) {
        res.status(400).send({ msg: "SOMETHIG WENT WRONG", data: " ", error: error });
    }
}


//UPDATE CONTACT ONE QUERY
const UpdateController = async (req, res) => {
    try {
        const condition = { _id: new ObjectId(req.params.id) };
        const value = req.body;
        console.log(condition);
        console.log(value);
        const result = await contactModel.updateOne(condition, { $set: value });
        res.status(200).send({ msg: "YOUR DATA IS UPDATE", data: result });
    } catch (error) {
        res.status(400).send({ msg: "SOMETHIG WENT WRONG", data: " ", error: error });
    }
}


// const searchController = async (req, res) => {
//     try {
//         if (req.params.search !== undefined || req.params.search !== "") {
//             let result = await contactModel.find({ name: req.params.search })
//             res.status(200).send({ status: "SUCCESS", msg: "SUCCESS", data: result })
//         }
//     } catch (error) {
//         res.status(400).send({ status: "FAILED", msg: error, data: {} })
//     }
// }


module.exports = { addController, getController, DeleteController, getControllerById, UpdateController };