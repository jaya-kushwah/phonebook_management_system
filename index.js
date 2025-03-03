const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes.js');
const contactRoutes = require('./routes/contactRoutes.js');
const groupRoutes = require('./routes/groupRoutes.js');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", userRoutes);
app.use("/api", contactRoutes);
app.use("/group", groupRoutes);


app.listen(5000, () => { console.log("SERVER STARTED") });