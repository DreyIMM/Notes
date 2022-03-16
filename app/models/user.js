const mongoose = require('mongoose');
//criptografar a senha
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({

    name: String,
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    create_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},

});


//transformando a senha para criptografia
// Esse (.pre) permite rodar um script antes (ou depois) de salvar no bd
//Next, passa para o proximo mideraware 
userSchema.pre('save', function(next){

    if(this.isNew || this.isModified('password')){
        //função para executar a cryptografia
        //passo o valor, qtd de caracter no cr
        //(err, e a senha depois de transformada)
        bcrypt.hash(this.password, 10,
            (err,hashedPassword)=>{
                if(err){
                    next(err)
                }else{
                    this.password = hashedPassword;
                    next();
                }
            });
            
    }

})


module.exports = mongoose.model('User', userSchema);

