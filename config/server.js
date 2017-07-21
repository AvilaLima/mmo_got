/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* importar o módulo do express-session */
var expressSession = require('express-session');

/* iniciar o objeto do express */
var app = express();

/* importar módulo Helmet (Segurança)*/
var helmet = require('helmet');

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configura o middleware express-validator */
app.use(expressValidator());

/* configura o middleware helmet */
app.use(helmet());


/* configura o middleware express-session */
app.use(expressSession( {
	secret: 'Da3nery$',
	resave: false,
	saveUninitialized: false,
	cookie:{maxAge:600000}
}));


/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.then('config/dbConnection.js')
	.into(app);

/* exportar o objeto app */
module.exports = app;