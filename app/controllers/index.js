module.exports.home = function (application, req, res)
{
		res.render('index', {validacao:{}});
}

module.exports.autenticar = function (application, req, res)
{
		var dadosForm = req.body;

		req.assert('usuario', 'Usuário não deve ser vazio').notEmpty();
		req.assert('senha', 'Senha não deve ser vazio').notEmpty();

		var erros = req.validationErrors();
		console.log(erros);
		if(erros)
		{
			res.render("index", {validacao: erros});
			return
		}
			
		var connection = application.config.dbConnection;
		var usuarioDAO = new application.app.models.UsuariosDAO(connection);

		usuarioDAO.autenticar(dadosForm,req,res);
}