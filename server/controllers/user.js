const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secretKey = 'node-todo-app'

exports.loginUser = async (req, res, next) => {
    const userName = req.body.username;
    const password = req.body.password;

    let user;

    try{
        const _user = await User.findOne( { where: { username : userName }} );
        if (_user === null){
            return res.status(406).json({status:406, message:'User does not exist'});
        }
        if (_user.password !== password){
            return res.status(406).json({status:406, message:'Incorrect Password'});
        }

        user = {
            id: _user.id,
            username: userName
        }

    }catch(e){
        return res.status(401).json({status:401, message: e.message});
    }
    try{
        const token = await jwt.sign({ user: user }, secretKey);
        return res.status(200).json({status:200, token: token, message:'Token Created Successfully'});
    
    }catch(e){
        return res.status(401).json({status:401, message: e.message});
    }
    
};

exports.registerUser = async (req, res, next) => {
    try{
        const taken = await User.findAll({ where: { username: req.body.username }});
        if (taken[0]){
            return res.status(400).json({status:400, message:'Username already taken'});
        }
    }catch(e){
        return res.status(400).json({status:400, message: e.message});
    }

    const user = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }

    try{
        const result = await User.create(user);
        return res.status(200).json({status:200, data: result, message: 'User registered successfully'});
    }catch(e){
        return res.status(400).json({status:400, message: e.message});
    }


};

exports.logoutUser = async (req, res, next) => {
    console.log("Logout Route Controller");
};