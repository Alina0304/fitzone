const {Router} = require('express')
const dateFormat = require('dateformat')
const path = require('path')
const fs = require('file-system')
//хеширование паролей
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const db=require('../config/db.conn')


const {check, validationResult} = require('express-validator')
const router=Router()
const curDate=new Date().getUTCMilliseconds();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длна пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try{
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
           db.query(candidate, [email],(err, result)=>{
                if(result.length==0){
                    console.log("ТУТ")
                    //шифрование пароля
                    const hashedPassword = bcrypt.hashSync(password,12);
                    const sqlInsert="INSERT INTO fit.auth (email, pass) VALUES (?,?);"
                    db.query(sqlInsert,[email, hashedPassword], (err, result)=>{
                        console.log("INSERT",result);
                        console.log("ERRORS", err)
                    });
                    const data = req.body.data.replace(/^data:image\/\w+;base64,/, "");
                    const buf = Buffer.from(data, 'base64')
                    console.log("Текущая директория",__dirname)
                    const nameLen=req.body.fileName.length
                    const name=req.body.fileName.substr(0,nameLen-4)
                    const type=req.body.fileName.substr(nameLen-4, nameLen)
                    const newName=name+curDate+type
                    const pathDb='/img/clients/'
                     fs.writeFile(path.join( __dirname, '../../client/public/img/clients/',newName), buf)
                    const sqlInsertSecond="INSERT INTO fit.account_kl (FIO_cl, Phone,Age,img) VALUES (?,?,?,?);"
                   db.query(sqlInsertSecond,[req.body.name, req.body.phone,dateFormat(req.body.date,"yyyy-mm-dd"), pathDb+newName], (err, result)=>{
                        console.log("INSERT",result);
                        console.log("ERRORS", err)
                    });
                    const sqlInsertThird="INSERT INTO fit.abonpay (idclient, idabon, summ,DateActivity) VALUES ((SELECT MAX(id) FROM account_kl),?,?,?);"
                   db.query(sqlInsertThird,[req.body.idabon, req.body.summ,dateFormat(req.body.active,"yyyy-mm-dd")], (err, result)=>{
                        console.log("INSERT",result);
                        console.log("ERRORS", err)
                    });
                }
               else{
                    return res.status(400).json({message: "Такой пользователь уже существует"});
                    }

               return res.status(201).json({message:"Пользователь создан"});
           });

        }catch (e) {
            return  res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
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
                res.json({token, userId: result[0].idauth, role: result[0].role, email: result[0].email});

            });




        }catch (e) {
            return res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }


    })
module.exports=router