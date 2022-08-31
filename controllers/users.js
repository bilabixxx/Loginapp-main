const User = require('../models/User');
const utils = require('../utils');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });
        const matchPassword = await user.matchPassword(password);
        if (!user || !matchPassword) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid email or password'
            });
        }

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            themeColor: user.themeColor,
            token: utils.generateJWTtoken(user),
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: "Invalid email or password"
        });
    }




}

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
            success: false,
            msg: 'User not found'
        });

    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            msg: 'You did not comply with the user schema'
        });
    }

    return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: utils.generateJWTtoken(user),
    });
}

const dashboard = async (req, res) => {
    const { _id } = req.query;

    const objectId = mongoose.Types.ObjectId(_id);
    const user = await User.aggregate([{ $match: { _id: objectId } }, { $unset: "password" }]);
    return res.status(200).json({
        success: true,
        data: user[0],
    });
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }

    });

    res.status(200).json({
        success: true,
        msg: "Logout"
    })
}

const updateThemeColor = async (req, res) => {
    const { themeColor, _id } = req.body
    const objectId = mongoose.Types.ObjectId(_id);

    User.findOneAndUpdate({ _id: objectId }, { $set: { themeColor: themeColor } }, { useFindAndModify: false, new: true })
        .then(() => res.status(200).json({
            success: true,
            msg: "User theme successfully updated!"
        }))
        .catch(() => res.status(404).json({
            success: false,
            msg: "User not found"
        }))

}

const updateUser = async (req, res) => {
    const { _id } = req.body;
    const data = { ...req.body }

    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
    }
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.send({
            status: false,
            msg: "User not found"
        });

        await User.findByIdAndUpdate(_id, data, { new: true })
        return res.status(200).json({
            status: true,
            msg: "User successfully updated!"
        })
    } catch (e) {
        return res.status(404).json({
            status: false,
            msg: "User not found"
        })
    }
}

const getUser = async (req, res) => {
    const { _id, password } = req.query;

    try {
        const user = await User.findById(_id);
        const checkPassword = await user.matchPassword(password);
        return res.status(200).json({
            success: true,
            password: checkPassword
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: "User not found",
        });
    }


}

const deleteUser = async (req, res) => {
    const { _id } = req.query;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({
            status: false,
            msg: 'Invalid user id'
        });

        await User.findByIdAndDelete(_id)
        return res.status(200).json({
            status: true,
            msg: "User successfully deleted"
        })
    } catch (e) {
        return res.status(404).json({
            status: false,
            msg: 'User not found'
        })
    }
}

module.exports = { login, signup, logout, dashboard, updateThemeColor, updateUser, getUser, deleteUser }