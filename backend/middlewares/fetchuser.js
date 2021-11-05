const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


//Fetchuser middleware verifies the jwt token and then appends the payload to the req body.
const fetchuser = (req,res,next)=>{
    const token = req.header("auth-token");

    if(!token){
        res.status(401).json({error:"No token present"});
    }

    try{
        const data = jwt.verify(token,process.env.JWT_TOKEN);
        req.user = data.user;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:"Try logging in with a valid token"});
    }
}

module.exports = fetchuser;