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
router.post('/inputemail',
    async (req, res) => {
        try{
            let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const authSelect='SELECT idauth,email FROM fit.auth WHERE email=?'
            db.query(authSelect, [req.body.email],(err, result)=>{
                if(result.length==0){
                    return res.status(400).json({message:'Такой email незарегестрирован в системе'})
                }
                //res.json({result});
                resetId=result[0].idauth

                const resetToken='UPDATE fit.auth SET resetpass=? WHERE idauth=?'
                db.query(resetToken, [token,resetId],(err, result)=>{
                        const message={
                        to: req.body.email,
                        subject: 'Запрос на восстановление пароля',
                        text: `Вы запросили ссылку на восстановление пароля на сайте www.fitzone.ru.
                    Для сброса пароля перейдите по ссылке: http://localhost:3000/reset/${token}`
                    }
                    mailer(message)
                    res.json({result});
                });
            });
        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }


    })
router.post('/inputpass',
    async (req, res) => {
        try{
            const sqlUpdatePass="UPDATE fit.auth SET pass=? WHERE idauth=?";
            db.query(sqlUpdatePass,[req.body.pass,resetId], (err, result)=>{
                console.log("UPDATEPASS",result);
            });
        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }


    })
module.exports=router