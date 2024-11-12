import { timeStamp } from "console";

const mongoose = require('mongoose');

interface User {
    email: string;
    password: string;
}


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    monthlyLimit: { type: Number, default: 1000 }, 
},
{
    versionKey: false,
    timestamps: true, 
});

module.exports = mongoose.model('users', userSchema);
