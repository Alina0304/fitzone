const {Router} = require('express');
//const  User = require('../models/user')
const config =require("../config/default.json")
//хеширование паролей
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')
const mysql=require('mysql');
const db=require('../config/db.conn')
const router=Router()

// /api/registration
router.get(
    '/abonstype',
    async (req, res) => {
        try{
            const abons=`SELECT abonement.id,abonement.type,abonement.opisanie  FROM abonement;`
            db.query(abons, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })
router.get(
    '/sroki',
    async (req, res) => {
        try{
            const clients=`SELECT DISTINCT srok FROM aboninfo;`
            db.query(clients, [],(err, result)=>{

                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })

router.get(
    '/registrate',
    async (req, res) => {
        try{
            const clients=``
            db.query(clients, [],(err, result)=>{

                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
router.get(
    '/role',
    async (req, res) => {
        try{
            const roles=`SELECT DISTINCT role from auth;`
            db.query(roles, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })
module.exports=router