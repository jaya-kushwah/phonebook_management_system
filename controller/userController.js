const user = require('../models/userModel');

const signupController = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password);
    try {
        const existuser = await user.findOne({ email: email });
        if (existuser) {
            res.status(400).send({ msg: "THIS USER IS ALREADY EXIST IN DATABASE" });
        }
        else if (password === confirmPassword) {
            const result = await user.create({ name: name, email: email, password: password });
            res.status(201).send({ msg: "SIGNUP SUCCESSFULLY", data: result });
        }
        else {
            res.status(400).send({ msg: "PLEASE ENTER CORRECT PASSWORD", data: {} });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "SOMETHIG WENT WRONG", data: " ", error: error });
    }
}




const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await user.matchPassword(email, password);

        if (result) {
            res.status(200).send({ msg: "LOGIN SUCCESSFULLY", data: result, error: "" })
        }
        else {
            res.status(400).send({ msg: "CHECK YOUR ID OR PASSWORD" })
        }
    } catch (error) {

        res.status(400).send({ msg: "SOMETHING WENT WRONG", error: error })
    }
}


module.exports = { signupController, loginController }



