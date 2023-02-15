import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt'


export const register = async (req,res)=>{
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }
        const pass =req.body.password;
        const bcSalt = await bcrypt.genSalt(10);
        const hashedPassw = await bcrypt.hash(pass,bcSalt);

        const document = new UserModel({
            email:req.body.email,
            fullName:req.body.fullName,
            avatarUrl:req.body.avatarUrl,
            passwordHash:hashedPassw
        })

        const user =await document.save();

        const token=jwt.sign({
            _id:user._id
        },'secret123',{
            expiresIn:'30d'
        })
        const {passwordHash,...userData} = user._doc;
        res.json({
            success:true,
            userData,
            token
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Something done wrong'
        })
    }
};

export const login = async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email:email})

        if(!user){
            return res.status(400).json({
                message:"Incorect email or pasword",
            });
        }

        const isValidPassword = await bcrypt.compare(password,user._doc.passwordHash);
        if(!isValidPassword){
            return res.status(400).json({
                message:"Incorect email or password"
            })
        }

        const token=jwt.sign({
            _id:user._id
        },
            'secret123',
        {
            expiresIn:'30d'
        });

        const {passwordHash,...userData} = user._doc;
        res.json({
            success:true,
            userData,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Something done wrong'
        })
    }
};

export const getMe = async(req,res)=>{
    try {
        const user = await UserModel.findById(req.userId);
        if(!user){
            return res.status(404).json({
                message:"Not found"
            })
        }
        const {passwordHash,...userData} = user._doc;
        res.json({
            success:true,
            userData,
        })
        
    } catch (error) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Something done wrong'
        })
    }
};