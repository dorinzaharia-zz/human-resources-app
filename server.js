const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// Connection to MongoDB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${
    process.env.DB_PASSWORD
}${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}`;
mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

var Users = require("./routes/Users");

app.use("/users", Users);

// Run server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
