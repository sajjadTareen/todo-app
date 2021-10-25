const User = require('../models/user');
const jwt = require('jasonwebtoken');

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
            username: username
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

