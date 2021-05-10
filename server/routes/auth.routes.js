const {Router} = require('express')
const dateFormat = require('dateformat')
const path = require('path')
const fs = require('file-system')
//хеширование паролей
const mailer=require('../config/nodemailer')
const formidableMiddleware = require('formidable')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const mysql=require('mysql')
const db=require('../config/db.conn')


const {check, validationResult} = require('express-validator')
const router=Router()
const curDate=new Date()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длна пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try{
            //console.log('Body: ', req.body);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    massage:"Некорректные данные при регистрации"
                })
            }
            const email=req.body.email;
            const password=req.body.password;

            const candidate="SELECT (email) FROM fit.auth WHERE email=?"
           /* db.query(candidate, [email],(err, result)=>{
                console.log("EMAIL",email);
                console.log("Результат выборки",result);
                if(result.length==0){
                    console.log("ТУТ")
                    //шифрование пароля
                    const hashedPassword = bcrypt.hashSync(password,12);
                    console.log("Захешированный пароль", hashedPassword)
                    const sqlInsert="INSERT INTO fit.auth (email, pass) VALUES (?,?);"
                    db.query(sqlInsert,[email, hashedPassword], (err, result)=>{
                        console.log("INSERT",result);
                        console.log("ERRORS", err)
                    });*/
                    const data = req.body.data.replace(/^data:image\/\w+;base64,/, "");
                    const buf = Buffer.from(data, 'base64')
                    console.log("Текущая директория",__dirname+'?')
                   // fs.writeFile(path.join(__dirname, '.../client/public/img/',req.body.fileName), buf)
            fs.writeFile(path.join(__dirname,req.body.fileName), buf)
                  //  console.log("КУда пишем",path.join(__dirname, '.../client/public/img/clients/',req.body.fileName))
                    const nameLen=req.body.fileName.length
                    const name=req.body.fileName.substr(0,nameLen-4)
                    const type=req.body.fileName.substr(nameLen-3, nameLen)
                    const newName=name+curDate+type
                    const pathDb='/img/clients/'
                    const sqlInsertSecond="INSERT INTO fit.account_kl (FIO_cl, Phone,Age,img) VALUES (?,?,?,?);"
                   /*db.query(sqlInsertSecond,[req.body.name, req.body.phone,dateFormat(req.body.date,"yyyy-mm-dd"), pathDb+newName], (err, result)=>{
                        console.log("INSERT",result);
                        console.log("ERRORS", err)
                    });*/
                    const sqlInsertThird="INSERT INTO fit.abonpay (idclient, idabon, summ,DateActivity) VALUES ((SELECT MAX(id) FROM account_kl),?,?,?);"
                   /* db.query(sqlInsertThird,[req.body.idabon, req.body.summ,dateFormat(req.body.active,"yyyy-mm-dd")], (err, result)=>{
                        console.log("INSERT",result);
                        console.log("ERRORS", err)
                    });*/
               // }
               /* else{
                    return res.status(400).json({message: "Такой пользователь уже существует"});
                    }*/

                res.status(201).json({message:"Пользователь создан"});
           // });

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
                console.log("Результат выборки",result);
                if(result.length==0){
                    return res.status(400).json({message:'Пользователь не найден'})
                }
                const isMatch = bcrypt.compare(password, result[0].pass)

                if (!isMatch) {
                    return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
                }
                const token = jwt.sign(
                    {userId: result[0].idauth, role: result[0].role, email:result[0].email},
                    "Alina secret str",
                    {expiresIn: '1h'}

                )
                console.log("token", token)
                res.json({token, userId: result[0].idauth, role: result[0].role, email: result[0].email});

            });




        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }


    })

/*router.post(
    '/upload',
    async (req, res) => {
        try{

            console.log(req.body)
            console.log(req.fileName)
            const data = req.body.data.replace(/^data:image\/\w+;base64,/, "");
            const buf = Buffer.from(data, 'base64')
            fs.writeFile(path.join(__dirname, '../temp/avatars/',req.body.fileName), buf)
            res.status(200).json({message:"Запрос обработан"});
        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
*/
module.exports=router