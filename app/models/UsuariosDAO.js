function UsuariosDAO(connection)
{    
	this._connection = connection();//o _ é uma convenção que indica que a variável só deve ser usada dentro do módulo.
}

UsuariosDAO.prototype.inserirUsuario = function (usuario,req,res)
{
    this._connection.open(function(error, mongoclient){
        mongoclient.collection("usuarios", function (error,collection)
        {
            collection.find({usuario: usuario.usuario}).toArray(function(error, result)
            {
                console.log(usuario);
               if(result.length== 0)
               {
                   console.log("entrou para inserir");
                    collection.insert(usuario);
                    var sucesso =  [{param:'', msg:"Usuário cadastrado com sucesso", value:''}];
                    res.render("index", {validacao:sucesso});
                    mongoclient.close();    
               } 
                else
                {
                    var erros = [{param:'', msg:"Usuário já possui cadastro", value:''}];
                    res.render("cadastro", {validacao:erros, dadosForm: usuario});               
                }         
            });         
        });        
    });
}

UsuariosDAO.prototype.autenticar = function (usuario,req,res)
{
    this._connection.open(function(error, mongoclient){
        mongoclient.collection("usuarios", function (error,collection)
        {
            //usuario: usuario.usuario e  usuario: $eq: usuario.usuario SÃO AS MESMA COISA
            //collection.find({usuario: usuario.usuario},senha: {$eq: usuario.senha}});
            collection.find(usuario).toArray(function(error, result)
            {
               if(result[0] != undefined)
                {
                    req.session.autorizado = true;  
                    req.session.usuario = result[0].usuario;    
                    req.session.casa = result[0].casa;  
                } 
                if(req.session.autorizado)
                {
                    res.redirect("jogo")
                }
                else{
                    res.render("index",{validacao: {}})
                }                
            });
            mongoclient.close();
        });
    });
}

module.exports = function ()
{
    return UsuariosDAO;
}