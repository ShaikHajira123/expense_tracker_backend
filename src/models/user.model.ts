
const mongoose3 = require('mongoose');

interface User {
    email: string;
    password: string;
}


const userSchema = new mongoose3.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    monthlyLimit: { type: Number, default: 1000 }, 
},
{
    versionKey: false,
    timestamps: true, 
});

module.exports = mongoose3.model('users', userSchema);
