var express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
var router = express.Router();
const User = require('../models/user')


// -> /users

//rota para cadastrar novos usuarios
router.post('/register', async(req,res)=>{

    const{name, email, password} = req.body;
    const user = new User({ name, email, password });
      

    try{

      await user.save();
      res.status(200).json(user)

    }catch(error){
      res.status(500).json({error: 'Error registering new user'})
    }

})

//criando um endPoint de login

router.post('/login', async(req,res)=>{

    const {email, password} = req.body;

    try{
      
      let user = await User.findOne({ email })
      console.log(user);
      //verificar se não está presente, ou seja não existe ou e-mail errado
      if(!user){

        res.status(401).json({error: 'Incorret email or passowrds'})

      }else{

            user.isCorrectPassword(password, function(err,same){
            if(!same){

              res.status(401).json({error: 'Incorret email or password'});

            }else{
              //Se a senha estiver ok, é chamado o token, e o que gera o token é o método sign (email, token, e dtExpiração)
              const token = jwt.sign({email}, secret, {expiresIn:'1d'});
              res.json({user:user, token:token});
            }

        })

      }


    }catch(error){

      res.status(500).json({error: 'Internal erro,please try again'})

    }


})


module.exports = router;
