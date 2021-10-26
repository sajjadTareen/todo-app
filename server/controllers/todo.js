const jwt = require('jsonwebtoken');
const Todo = require('../models/todo.js');
const User = require('../models/user');

const secretKey = 'node-todo-app';

exports.getTodos = async (req, res, next) => {

    let authData;
    try{
        authData = await jwt.verify(req.token, secretKey);
    }catch(e){
        return res.status(403).json({status:403 , message: e.message});
    }

    const limit = req.query.limit? Number(req.query.limit) : 10;
    const offset = 0 + ((req.query.page? Number(req.query.page) : 1) - 1) * limit;
    
    try{
        const todos = await Todo.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', 'ASC']],
            where: { userid: authData.user.id}
        });
        return res.status(200).json({status: 200, data: todos, message: `Successfully fetched ${todos.rows.length} todos`});
    }catch(e){
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.createTodo = async (req, res, next) => {
    const todo = {
        title: req.body.title,
        desc: req.body.desc,
        status: req.body.status
    };

    let authData;
    try{
        authData = await jwt.verify(req.token, secretKey);
    }catch(e){
        return res.status(403).json({status:403 , message: e.message});
    }

    try{
        const user = await User.findByPk(authData.user.id);
        const createdTodo = await user.createTodo(todo);
        return res.status(200).json({status: 201, data: createdTodo, message: 'Successfully Todos Recieved'});
    }catch(e){
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.updateTodo = async (req, res, next) => {

    let authData;
    try{
        authData = await jwt.verify(req.token, secretKey);
    }catch(e){
        return res.status(403).json({status:403 , message: e.message});
    }
    
    if (!req.body.id){
        return res.status(400).json({status: 400, message: 'ID must be present'});
    }
    try{
        const id = Number(req.body.id);

        let todo = await Todo.findAll({
            where : {
                id : id,
                userid: authData.user.id
            }
        });
        todo = todo[0];
        if (todo === undefined){
            return res.status(400).json({status: 400, message: 'ID not found'});
        }

        todo.title = req.body.title? req.body.title: todo.title;
        todo.desc = req.body.desc? req.body.desc: todo.desc;
        todo.status = req.body.status? req.body.status: todo.status;

        try{
            const updatedTodo = await todo.save();
            return res.status(200).json({status: 200, data: updatedTodo, message: 'Successfully updated Todos'});
        }catch(e){
            return res.status(400).json({status:400, message: e.message});
        }
    }catch(e){
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.deleteTodo = async (req, res, next) => {
    if (!req.query.id){
        return res.status(400).json({status: 400, message: 'ID must be present'});
    }

    let authData;
    try{
        authData = await jwt.verify(req.token, secretKey);
    }catch(e){
        return res.status(403).json({status:403, message: e.message});
    }
    
    try{
        const id = req.query.id;
        const user = await User.findByPk(authData.user.id);
        try{
            const todo = await user.getTodos({where: {id: id}});
            if (todo[0] === undefined){
                return res.status(400).json({status: 400, message: 'ID not found'});
            }
            const result = await todo[0].destroy();
            return res.status(200).json({status: 200, data: result, message: 'Todo successfully deleted'});
        }catch(e){
            return res.status(400).json({status: 400, message: e.message});
        }
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.updateStatus = async (req, res, next) => {
    
    if (!req.query.id){
        return res.status(400).json({status: 400, message: 'ID must be present'});
    }
    try{
        const id = req.query.id;
        const todo = await Todo.findByPk(id);
        todo.status = req.query.status
        try{
            const updatedTodo = await todo.save();
            return res.status(200).json({status: 200, data: updatedTodo, message: 'Successfully updated Status'});
        }catch(e){
            return res.status(400).json({status:400, message: e.message});
        }
    }catch(e){
        return res.status(400).json({status:400, message: e.message});
    }
};