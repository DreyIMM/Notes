const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

//conectando ao banco de dados local
mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true 

}).then(() => console.log('Conection succesful'))
.catch((err) =>console.log(err));


