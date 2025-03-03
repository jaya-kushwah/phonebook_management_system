const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
require('../dbConnect');
const salt = 'happy coding'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})


userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified("password")) {
        const hashedPassword = createHmac('sha256', salt)
            .update(user.password)
            .digest('hex');

        this.password = hashedPassword;
        console.log(hashedPassword);
        console.log(this);
    }
    next();
})


userSchema.static("matchPassword", async function (email, password) {
    const data = await this.findOne({ email: email });
    console.log(email);

    if (data) {

        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");

        if (hashedPassword === data.password) {
            const { _id, name, email } = data;
            return { _id, name, email };
        } else {
            return false;
        }
    } else {
        console.log("else");
        return false;
    }
});

const userModel = mongoose.model('signups', userSchema);
module.exports = userModel;