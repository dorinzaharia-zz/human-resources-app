const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
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
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String
    },
    phone_number: {
        type: String
    },
    company: {
        type: String
    },
    department: {
        type: String
    },
    linked_in: {
        type: String
    }
});

module.exports = User = mongoose.model("users", UserSchema);
