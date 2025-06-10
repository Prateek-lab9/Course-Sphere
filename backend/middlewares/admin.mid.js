import config  from "../config.js";
import jwt from "jsonwebtoken";

function adminMiddleware (req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({errors:"Invalid or expired token"})
    }
   const token = authHeader.split(" ")[1]
   try {
   const decoded = jwt.verify(token,config.JWT_ADMIN_PASSWORD)
    req.adminId = decoded.id;
    next();
   } catch (error) {
    console.log(error)
    res.status(401).json({errors:"Invalid or expired token" + error})
   }

}

export default adminMiddleware