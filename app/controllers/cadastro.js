module.exports.index = function (application, req, res)
{
    res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();    
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    req.assert('casa', 'Ao menos uma casa deve ser escolhida').notEmpty();

    var erros = req.validationErrors();
    
    if(erros)
    {
        res.render('cadastro',{validacao:erros, dadosForm: dadosForm});
        return;
    }
    else
    {        
        var connection = application.config.dbConnection;

        var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
        var JogoDAO = new application.app.models.JogoDAO(connection);

        UsuariosDAO.inserirUsuario(dadosForm,req,res);
        JogoDAO.gerarParametros(dadosForm.usuario);
        //var sucesso = [{param:'',msg:'Cadastrado com sucesso !!!',value:''}]
        //res.render("index",{validacao: sucesso});                  
        
    }


}