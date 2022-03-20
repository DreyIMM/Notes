var express = require('express');
var router = express.Router();
const Note = require('../models/notes');
const withAuth = require('../middlewares/auth');

//criando um rota que cria uma nota
router.post('/', withAuth, async(req,res) =>{

    const {title, body} = req.body;

    try{
        let note = new Note({title: title, body: body, author: req.user._id})

        await note.save();
        res.status(200).json(note);
    }catch(error){
        res.status(500).json({error: 'Problem to create a new note'});

    }

})


//Rota -> apresenta nota de acordo com o token
router.get('/:id', withAuth, async(req,res)=>{
    
    try {

        const {id} = req.params;
        
        let note = await Note.findById(id);

        //precisa-se verificar quem é o dono daquela nota
        if(isOwner(req.user, note)){
            res.json(note);
        }else{
            res.status(403).json({error: 'Permission denied'});
        }
    } catch (error) {
        res.status(500).json({error: 'Problem to get a new note'});
    }

})

//rota 
//ATENTION: o req.user._id vem do WithAut
router.get('/', withAuth, async(req,res)=>{

    try {
        let notes = await Note.find({author: req.user._id});
        res.json(notes)
    } catch (error) {
        res.json({error: error}).status(500);
    }

})





//criando um método para verificar o dono da nota
//JSON.stringfy -> converte para text
const isOwner = (user, note)=>{

    if(JSON.stringify(user._id) == JSON.stringify(note.author._id)){
        return true;
    }else{
        return false;
    }

}

module.exports = router;