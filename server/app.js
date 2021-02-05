const express=require('express');
const app=express();
const mysql=require('mysql');
const config=require('config')


app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/trener', require('./routes/trener.routes'))
app.use('/api/zanytiy', require('./routes/zanytiy.routes'))
app.use('/api/client', require('./routes/client.routes'))
app.use('/api/nouting', require('./routes/nouitig.routes'))
app.use('/api/notauf', require('./routes/notauf.routes'))

const PORT = config.get('port') || 5000;
const db= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'fit',
});

async function  start(){
    try {
        db.connect();
        console.log('Connect');
        app.listen(PORT, ()=> console.log(`App has been running on port ${PORT}`));
    }catch (e) {
        console.log('Server Error', e.message)
        process.exit(1);

    }
}
start();