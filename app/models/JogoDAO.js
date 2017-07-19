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

JogoDAO.prototype.iniciaJogo = function(usuario,casa,comando_invalido,callback)
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

module.exports = function()
{
    return JogoDAO;
}