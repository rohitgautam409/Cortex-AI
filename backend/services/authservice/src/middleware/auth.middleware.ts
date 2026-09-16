import type {Request,Response,NextFunction} from 'express'
import admin from '../../config/firebase.js'


export const authenticate = async (req:Request,res:Response,next:NextFunction)=>{

    try{
        const authHeader = req.headers.authorization;

        if(!authHeader?.startsWith("Bearer ")){
            res.status(401).json({
                message : "Authorization token required"
            })
            return;
        }
        const token  = authHeader.split("Bearer ")[1]

        if(!token){
             res.status(401).json({
                message : "Authorization token required"
            })
            return;
        }
        
        const decodedToken = await admin.auth().verifyIdToken(token)

        req.user = decodedToken;
        next();

    }catch(error){
        res.status(401).json({
            message: 'invalid or expired firebase token'
        })
    }
}