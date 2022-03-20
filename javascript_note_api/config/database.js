const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//conectando ao banco de dados local
mongoose.connect('mongodb://localhost/javascriptNote',{
    useNewUrlParser: true,
    useUnifiedTopology: true 

}).then(() => console.log('Conection succesful'))
.catch((err) =>console.log(err));