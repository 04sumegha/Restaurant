const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "Token is not present"});
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(data);
        if(data.userId){
            req.userId = data.userId;
            req.email = data.email;
        }
        else{
            req.staffId = data.staffId;
        }
        next();
    } 
    
    catch (error) {
        return res.status(500).json({message: "Token not verified"});    
    }
}

module.exports = authentication;