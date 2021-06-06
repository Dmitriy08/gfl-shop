const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    if(req.method === 'OPTIONS'){
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return req.status(401).json({msg: 'Are not logged'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded;
        next();
    }catch (e){
        req.status(401).json({msg: 'Are not logged'})
    }
}
