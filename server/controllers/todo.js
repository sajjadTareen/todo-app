const Todo = require('../models/todo.js');

exports.getTodos = async (req, res, next) => {
    const limit = req.query.limit? Number(req.query.limit) : 10;
    const offset = 0 + ((req.query.page? Number(req.query.page) : 1) - 1) * limit;
    
    try{
        const todos = await Todo.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', 'ASC']]
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
    try{
        const createdTodo = await Todo.create(todo);
        return res.status(200).json({status: 200, data: createdTodo, message: 'Successfully Todos Recieved'});
    }catch(e){
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.updateTodo = async (req, res, next) => {
    if (!req.body.id){
        console.log(req.body)
        return res.status(400).json({status: 400, message: 'Id must be present'});
    }

    const id = req.body.id;
    try{
        const todo = await Todo.findByPk(id);
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
    if (!req.body.id){
        return res.status(400).json({status: 400, message: 'Id must be present'});
    }
    const id = req.body.id;
    try{
        const todo = await Todo.findByPk(id);
        try{
            const result = await todo.destroy();
            return res.status(400).json({status: 400, data: result, message: 'Todo successfully deleted'});
        }catch(e){
            return res.status(400).json({status: 400, message: e.message});
        }
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
};