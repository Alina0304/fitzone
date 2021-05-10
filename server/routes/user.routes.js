const {Router} = require('express');
//const  User = require('../models/user')
const config =require("../config/default.json")
//хеширование паролей
const mailer=require('../config/nodemailer')
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')
const mysql=require('mysql');
const auth = require('../middlewear/auth.middlewear')
const db=require('../config/db.conn')
const router=Router()
let resetId=null
router.get('/token/:token',
    async (req, res) => {
        try{
            console.log("ЗАШЕЛ")
            const findUser='SELECT idauth,resetpass FROM fit.auth WHERE resetpass=?'
            db.query(findUser, [req.params.token],(err, result)=>{
                if(result.length==0){
                    return res.status(400).json({message:'Неверный токен'})
                }
                res.json({id:result[0].idauth});
            });
        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }


    })
module.exports=router