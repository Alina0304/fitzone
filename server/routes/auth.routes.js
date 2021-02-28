const {Router} = require('express');
//const  User = require('../models/user')
const config =require("../config/default.json")
//хеширование паролей
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')
const mysql=require('mysql');
const db=require('../config/db.conn')

const {check, validationResult} = require('express-validator')
const router=Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длна пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try{
            console.log('Body: ', req.body);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    massage:"Некорректные данные при регистрации"
                })
            }
            const email=req.body.email;
            const password=req.body.password;
            //const {email,password}=req.body
            //const candidate="SELECT * FROM fit.auth"

            const candidate="SELECT (email) FROM fit.auth WHERE email=?"
            db.query(candidate, [email],(err, result)=>{
                console.log("EMAIL",email);
                console.log("Результат выборки",result);
                if(result.length==0){
                    //шифрование пароля
                    //const hashedPassword = bcrypt.hash(password,12);
                    const sqlInsert="INSERT INTO fit.auth (email, pass) VALUES (?,?)";
                    db.query(sqlInsert,[email, password], (err, result)=>{
                        console.log("INSERT",result);
                    });
                }
                else{
                    return res.status(400).json({message: "Такой пользователь уже существует"});
                    }

                res.status(201).json({message:"Пользователь создан"});
            });

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })
// /api/auth/login
router.post('/login',
    [
        check('email', 'Введите корректрый email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль длиной не менее 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    massage:"Некорректные данные при входе в систему"
                })
            }
           const email=req.body.email;
           const password=req.body.password;

            const authSelect='SELECT idauth,email, pass, role FROM fit.auth WHERE email=?'
            db.query(authSelect, [email],(err, result)=>{
                console.log("EMAIL",email);
                console.log("PAss",password);
                console.log("Результат выборки",result[0].pass);
                if(result.length==0){
                    return res.status(400).json({message:'Пользователь не найден'})
                }

                if(result[0].pass !== password)
                {
                    return res.status(400).json({message: "Неверный пароль, попробуйте снова"})
                }
                const token = jwt.sign(
                    {userId: result[0].idauth, role: result[0].role},
                    "Alina secret str",
                    {expiresIn: '1h'}

                )
                console.log("token", token)
                res.json({token, userId: result[0].idauth, role: result[0].role});

            });




        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }


    })
module.exports=router