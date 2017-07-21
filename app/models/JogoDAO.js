function JogoDAO(connection){
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario)
{
    this._connection.open( function (err, mongoclient)
    {
        mongoclient.collection("jogo",function(err,collection)
        {
            collection.insert({
                usuario:usuario,
                moeda:15,
                suditos:10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria:  Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });
            mongoclient.close();
        });
    });
}

JogoDAO.prototype.iniciaJogo = function(usuario,casa,msg,callback)
{
  this._connection.open(function(error, mongoclient){
        mongoclient.collection("jogo", function (error,collection)
        {
            //usuario: usuario.usuario e  usuario: $eq: usuario.usuario SÃO AS MESMA COISA
            //collection.find({usuario: usuario.usuario},senha: {$eq: usuario.senha}});
            collection.findOne({usuario: usuario}, function (err, result) {
                callback(result);
            });
 
            mongoclient.close();
        });
  });
}

JogoDAO.prototype.acao = function(acao)
{
   this._connection.open( function (err, mongoclient)
    {
        mongoclient.collection("acao",function(err,collection)
        {
            var date = new Date();
            var tempoDaAcao=null;
            switch(parseInt(acao.acao))
            {
                case 1: 
                    tempoDaAcao = 1*60*60000; //1h;
                    break;
                case 2: 
                    tempoDaAcao = 2*60*60000; //2h;
                    break;
                case 3: 
                    tempoDaAcao = 5*60*60000; //5h;
                    break;
                case 4: 
                    tempoDaAcao = 5*60*60000; //5h;
                    break;
            }
            acao.terminoDaAcao =  tempoDaAcao + date.getTime() //01/01/1970 até o instante em que a função getTime foi executada;

            collection.insert(acao);
        });

        mongoclient.collection("jogo",function(err,collection)
        {
            
            var moedas=null;
            switch(parseInt(acao.acao))
            {
                case 1: 
                    moedas = -2 * acao.quantidade;
                    break;
                case 2: 
                    moedas = -3 * acao.quantidade; 
                    break;
                case 3: 
                    moedas = -1 * acao.quantidade; 
                    break;
                case 4: 
                    moedas = -1 * acao.quantidade;
                    break;
            }
            collection.update(
                {usuario: acao.usuario},
                { $inc: {moeda : moedas}}
            );
            
            mongoclient.close();
        });
    });
}


JogoDAO.prototype.getAcoes = function(usuario,res)
{   
  this._connection.open(function(error, mongoclient){
        mongoclient.collection("acao", function (error,collection)
        {
            //usuario: usuario.usuario e  usuario: $eq: usuario.usuario SÃO AS MESMA COISA
            //collection.find({usuario: usuario.usuario},senha: {$eq: usuario.senha}});
            var date = new Date();
            var momento_atual = date.getTime();
            collection.find({usuario: usuario, terminoDaAcao: {$gt:momento_atual}}).toArray(function (err, result) {
                res.render("pergaminhos", {acoes: result});

            }); 
            mongoclient.close();
        });

  });
}

module.exports = function()
{
    return JogoDAO;
}
