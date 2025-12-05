require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const APP_PORT = process.env.APP_PORT;
const homeRouter = require('./app/routers/homeRouter');
const clienteRouter = require('./app/routers/cadastros/clienteRouter');
const familiaProdutoRouter = require('./app/routers/cadastros/familiaProdutoRouter');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'chaveSecreta',
    resave: false, // evita salvar sessoes nao modificadas
    saveUninitialized: false, //evita salvar sessao vazia
    coockie:{
        maxAge: 60000 //tempo de vida do coockie
    }
}));

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/', clienteRouter);
app.use('/', familiaProdutoRouter);

app.listen(APP_PORT, function(){
    console.log(`app online in http://localhost:${APP_PORT}`);
});