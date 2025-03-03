const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/phoneDirectory').then((res) => {
    console.log("DdConnect");
}).catch((err) => {
    console.log("NOT CONNECT");
})