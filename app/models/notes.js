//importando mongoose
const mongoose = require('mongoose');

//criando os Schemas

let noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    create_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    //basicamente a parte de relação nota com autor (1- padrão 2-qual referência 3- é obrigatorio) 
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
//exportando o modulo como Note
module.exports = mongoose.model('Note', noteSchema)