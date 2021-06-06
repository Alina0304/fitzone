const express=require('express');
const app=express();
const config=require('config')
const db = require('./config/db.conn')



app.use(express.json({extended: true, limit: '10mb'}))
app.use(express.static('temp'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/trener', require('./routes/trener.routes'))
app.use('/api/zanytiy', require('./routes/zanytiy.routes'))
app.use('/api/client', require('./routes/client.routes'))
app.use('/api/nouting', require('./routes/nouitig.routes'))
app.use('/api/notauf', require('./routes/notauf.routes'))
app.use('/api/diagramm', require('./routes/diagramm.routes'))
app.use('/api/tablepay', require('./routes/tablepay.routes'))
app.use('/api/reset', require('./routes/reset.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/abonpay', require('./routes/abonpay.routes'))
app.use('/api/registration', require('./routes/registration.routes'))
app.use('/api/payinfo', require('./routes/payinfo.routes'))
app.use('/api/nout', require('./routes/nout.routes'))
app.use('/api/changing', require('./routes/change.routes'))
app.use('/api/calendar', require('./routes/calendar.routes'))

const PORT = config.get('port') || 5000;

async function start(){
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