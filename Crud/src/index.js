import express from 'express';
import path from 'path';
const app = express();
import morgan from 'morgan';
import mysql from 'mysql';
import mysqlConnection from 'express-myconnection';

//importando 
//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middlewares
app.use(morgan('dev'));
app.use(mysqlConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'alexander',
    port: 3306,
    database: 'BufetAbogado'


}, 'single'));

// routes


app.listen(app.get('port'), () =>{
    console.log('Mi servidor esta escuchando el puerto 3000');

});  

