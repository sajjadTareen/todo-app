const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['Authorization'];

    if (typeof bearerHeader !== undefined){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }else{
        return res.status(403).json({status: 403, message:'Not Authroized to view Content'});
    }
};

module.exports = verifyToken;