require('dotenv').config();
var express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
var router = express.Router();
const User = require('../models/user')
var jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;


//rota para listar os usuarios (interno)
router.get('/listarusers', async(req,res)=>{

  try{    
    let users = await User.find();
    res.status(200).json(users)

  }catch(error){
    res.status(500).json({error: 'Error in find all users'})
    
  }
})



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
router.post('/login', async(req, res)=>{

    const {email, password} = req.body;

    try{
      //pegar todo o objeto user único pelo e-mail
      let user = await User.findOne({  email })
      
      //verificar se não está presente, ou seja não existe ou e-mail errado
      if(!user){

        res.status(401).json({error: 'Incorret email or passowrds'})

      }else{

            user.isCorrectPassword(password, function(err,same){
            if(!same){

              res.status(401).json({error: 'Incorret email or password'});

            }else{
              //Se a senha estiver ok, é chamado o token, e o que gera o token é o método sign (email, token, e dtExpiração)
              const token = jwt.sign({email}, secret, {expiresIn:'30d'});
              res.json({user:user, token:token});
            }

        })
      }

    }catch(error){

      res.status(500).json({error: 'Internal erro, please realod and try again'})

    }

})


module.exports = router;
