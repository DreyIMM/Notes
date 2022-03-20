//Verificando o usuario da requisição, quando ele fizer uma chamado, quero saber se o token é valido e pegue o usuario da requisição.

//pegando o secreto
require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const WithAuth = (req, res, next)=>{

    const token = req.headers['x-access-token'];

    if(!token){
        res.status(401).json({error: 'Unauthorized: no token provied'});
    }else{
        //verify -> verifica o token
        jwt.verify(token,secret,(err,decode)=>{
            if(err){
                res.status(401).json({error: 'Unauthorized: token invalid'});
            }else{
                req.email = decode.email;
                User.findOne({email: decode.email}).then(user =>{
                    req.user = user
                    next();
                }).catch(err =>{
                    res.status(401).json({error: err});
                })
            }
        })
    }
        
}

module.exports = WithAuth;