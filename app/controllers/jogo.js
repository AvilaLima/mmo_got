module.exports.index = function (application, req, res)
{
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
 
    if(req.session.autorizado)
    {

        var usuario = req.session.usuario;
        var casa = req.session.casa;
        var connection = application.config.dbConnection;

        var JogoDAO = new application.app.models.JogoDAO(connection);

        var comando_invalido = 'N';

        if(req.query.comando_invalido == 'S')
        {
            comando_invalido = 'S';
        }

        JogoDAO.iniciaJogo(usuario, casa,comando_invalido, function(jogo){
            console.log(jogo);
            res.render('jogo', {
                img_casa: casa,
                jogo: jogo,
                comando_invalido:comando_invalido
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
    res.render("pergaminhos", {validacao:{}});
}

module.exports.ordernar_acao_sudito = function(application,req,res)
{
    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada.').notEmpty();
    
    req.assert('quantidade', 'Quantidade deve ser informada.').notEmpty();
    
    var erros = req.validationErrors();

    if(erros)
    {
        res.redirect('jogo?comando_invalido=S');
        return;
    }

    res.send("Tudo OK");
}