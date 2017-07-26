module.exports.index = function (application, req, res)
{
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
 
    if(req.session.autorizado)
    {

        var usuario = req.session.usuario;
        var casa = req.session.casa;
        var connection = application.config.dbConnection;

        var JogoDAO = new application.app.models.JogoDAO(connection);

        var msg = '';

        if(req.query.msg != '')
        {
            msg = req.query.msg;
        }
        JogoDAO.iniciaJogo(usuario, casa,msg, function(jogo){
            res.render('jogo', {
                img_casa: casa,
                jogo: jogo,
                msg:msg
            });
        })


    }else{
       var erros = [{param: '', msg: 'Usuário precisa estar logado', value: ''}];
       res.render('index', {validacao: erros}); 
       return
    }
}

module.exports.sair = function (application, req, res)
{
    req.session.destroy(function (error)
    {
       res.redirect('/');
    });
}

module.exports.suditos = function (application, req, res)
{
    res.render("aldeoes", {validacao:{}});
}

module.exports.pergaminhos = function (application, req, res)
{
    /*recuperar as ações inseridas no banco de dados */    
    var connection = application.config.dbConnection;

    var JogoDAO = new application.app.models.JogoDAO(connection);

    var usuario = req.session.usuario;

    JogoDAO.getAcoes(usuario, res);
    
}

module.exports.ordernar_acao_sudito = function(application,req,res)
{
    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada.').notEmpty();
    
    req.assert('quantidade', 'Quantidade deve ser informada.').notEmpty();
    
    var erros = req.validationErrors();
    if(erros)
    {
        res.redirect('jogo?msg=E');
        return;
    }
    var connection = application.config.dbConnection;  
    
    var JogoDAO = new application.app.models.JogoDAO(connection);
    
    dadosForm.usuario = req.session.usuario;

    JogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=S')
}