const {Router} = require('express');
const auth = require('../middlewear/auth.middlewear')
const dateFormat = require('dateformat')
const path = require('path')
const fs = require('file-system')
const db=require('../config/db.conn')
const router=Router()
const curDate = new Date().getUTCMilliseconds();
// /api/changing
router.get(
    '/clientinfo/:id', auth,
    async (req, res) => {
        console.log("ID", req.params.id)
        try{
            const curClient=`SELECT auth.email, account_kl.FIO_cl, DATE_FORMAT(account_kl.Age,'%Y-%m-%d') AS Age, account_kl.Phone, account_kl.img FROM account_kl, auth where account_kl.id=? AND account_kl.id=auth.idauth;`
            db.query(curClient, [req.params.id],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })
router.post(
    '/changeinfo/',
    async (req, res) => {
        const data = req.body.data.replace(/^data:image\/\w+;base64,/, "");
        const buf = Buffer.from(data, 'base64')
        console.log("Текущая директория",__dirname)
        const nameLen=req.body.fileName.length
        const name=req.body.fileName.substr(0,nameLen-4)
        const type=req.body.fileName.substr(nameLen-4, nameLen)
        const newName=name+curDate+type
        fs.writeFile(path.join( __dirname, '../../client/public/img/clients/',newName), buf)
        const pathDb='/img/clients/'
        try{
           const sqlInsertInfo="UPDATE account_kl SET FIO_cl=?, Age=?, Phone=?, img=? WHERE id=?"
            db.query(sqlInsertInfo,[req.body.name, dateFormat(req.body.date,"yyyy-mm-dd"),req.body.phone, pathDb+newName, req.body.id], (err, result)=>{
                console.log("INSERT",result);
                console.log("ERRORS", err)
            });
            const sqlInsertEmail="UPDATE auth SET email=? WHERE idauth=?"
            db.query(sqlInsertEmail,[req.body.email,req.params.id], (err, result)=>{
                console.log("INSERT",result);
                console.log("ERRORS", err)
            });
        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })
module.exports=router