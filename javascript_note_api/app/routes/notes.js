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


//Rota -> realiza uma busca da nota pelo nome(title)
router.get('/search', withAuth, async(req,res)=>{
    const {query} = req.query;

    try {
        let notes = await Note.
        find({author: req.user._id})
        .find({ $text: {$search: query}});
        res.json(notes);

    } catch (error) {
        res.json({error: error}).status(500);
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

//Rota para atulizar uma nota
router.put('/:id', withAuth, async(req, res)=>{
    const {title, body} = req.body
    const {id} = req.params;


    try 
    {
        let note = await Note.findById(id);

        if(isOwner(req.user, note)){

            let note = await Note.findByIdAndUpdate(id,
                
            {$set: {title: title, body: body}},
            {upsert: true, "new": true}   );

            res.json(note);

        }else{
            res.status(403).json({error: 'Permission denied'});
        }

        
    } catch (error) {
        res.status(500).json({error: 'Problem to update a note'});
    }

})

//Rota para deletar uma nota
router.delete('/:id', withAuth, async(req,res)=>{

    const {id} = req.params; 
    try {
        let note = await Note.findById(id);
        if(isOwner(req.user, note)){
            await note.delete();
            res.json({message: 'Thanks, your note has been deleted'}).status(204);
        }else{
            res.status(403).json({error: 'Permission denied'});
        }
    } catch (error) {
        res.status(500).json({error: 'Problem to delete a note'});
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