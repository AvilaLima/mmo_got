module.exports = function(application){	
    application.get('/jogo', function(req,res)
    {
        application.app.controllers.jogo.index(application,req,res);
    });
    application.get('/sair', function(req,res)
    {
        application.app.controllers.jogo.sair(application,req,res);
    });
    application.get('/suditos', function(req,res)
    {             
        if(req.session.autorizado!==true)
        {
            var erros = [{param: '', msg: 'Usuário precisa estar logado', value: ''}];
            res.render('index', {validacao: erros}); 
            return
        }
        application.app.controllers.jogo.suditos(application,req,res);
    });
    application.get('/pergaminhos', function(req,res)
    {        
        if(req.session.autorizado!==true)
        {
            var erros = [{param: '', msg: 'Usuário precisa estar logado', value: ''}];
            res.render('index', {validacao: erros}); 
            return
        }
        application.app.controllers.jogo.pergaminhos(application,req,res);
    });
    application.post('/ordernar_acao_sudito', function(req,res)
    {     
        if(req.session.autorizado!==true)
        {
            var erros = [{param: '', msg: 'Usuário precisa estar logado', value: ''}];
            res.render('index', {validacao: erros}); 
            return
        }
        application.app.controllers.jogo.ordernar_acao_sudito(application,req,res);
    });
}
