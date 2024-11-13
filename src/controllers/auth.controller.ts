const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt1 = require('jsonwebtoken');
require('dotenv').config();


const registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email:req.body.email }).lean().exec();
        if (user) {
            return res.status(401).json({ message: "Email already exists. Please try another email", token:'', user: null })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
        });

        user = await newUser.save();
        const token = jwt1.sign({ userId: newUser._id }, process.env.JWT_SECRETKEY, {
            expiresIn: '1h',
        });
        return res.status(201).json({ token, user });
    } catch (err) {
        throw new Error(err?.message)
    }
}


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ email: username }).lean().exec();
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials', token:'', user: null });
        }
        const token = jwt1.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (err) {
        throw new Error('Error logging in user');   
    }
}

module.exports = { loginUser, registerUser }