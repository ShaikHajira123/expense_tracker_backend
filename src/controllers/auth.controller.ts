const User = require('../models/user.model');

const registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email:req.body.email }).lean().exec();
        if (user) {
            return res.json({ message: "please try another email" })
        }
        user = await User.create(req.body);
        return res.json({ user  })
    } catch (err) {
        throw new Error(err?.message)
    }
}


const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.username }).lean().exec();
        if (!user) {
            return res.status(500).send({ message: "please try another email" })
        }
        res.json({ message: 'User logged in successfully' , _id: user._id });
    } catch (err) {
        throw new Error('Error logging in user');   
    }
}

module.exports = { loginUser, registerUser }