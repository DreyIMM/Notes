require('dotenv').config();
var express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
var router = express.Router();
const User = require('../models/user')
var jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;
const bcrypt = require('bcrypt');


//rota para listar os usuarios (interno)
router.get('/listarusers/', async(req,res)=>{

  try{   
    let users = await User.find();
    res.status(200).json(users)

  }catch(error){
    res.status(500).json({error: 'Error in find all users'})
    
  }
})

//rota que retorna um usuario
router.get('/:id', async (req,res)=>{

  const {id} = req.params;
  
  try{

      let user = await User.findById(id);
      res.status(200).json(user)

  }catch(error){
    res.status(500).json({Error: 'User not found'})
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


//Rota para atulizar um usuario
router.put('/edit/:id', async(req, res)=>{
  
  const {email, password, newPassword} = req.body
  const {id} = req.params;

  try {
      let user = await User.findById(id);

      user.isCorrectPassword(password, async function(err,same){
      
      if(!same){
                  
          user = await User.findOneAndUpdate(id,
          
          {$set: {email: email, password: newPassword}});
                   
          console.log("incorreta")
          console.log(newPassword);
          res.status(201).json(user)

      }else{
        
          user = await User.findOneAndUpdate(id,
                
          {$set: {email: email, password: newPassword}});
          
          console.log("senha ok")
          res.status(201).json(user)
        }
      })
    

  } catch (error) {

    res.status(500).json({error: 'Problem to update a user'});
  }
})

module.exports = router;
