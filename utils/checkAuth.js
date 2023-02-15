import  jwt  from "jsonwebtoken";

export default (req,res,next)=>{
    const token = (req.headers.authorization || '').replace(/Bearer\s/,'');
    console.log("Token from reqest", token);
    if(token){
        try {
            const decodedToken = jwt.verify(token,'secret123');
            console.log('decoded token', decodedToken);
            req.userId = decodedToken._id;
            next();
         } catch (error) {
            console.log(error);
            res.status(500).json({
                message:"Access forbiden"
            })
            
        }
    }else{
        return res.status(403).json({
            message:"Access forbiden"
        })
    }
    
}