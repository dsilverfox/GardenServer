const { Router } = require('express');
const Express = require ('express')
const router = Express.Router();
const validateSession = require('../middleware/validate-jwt');
const { NotesModel } = require('../models');



// GET ALL NOTES

router.get('/all', validateSession, async (req, res) => {
    const { id } = req.user;
    try {
        const userNotes = await NotesModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userNotes);
    } catch (err){
        res.status(404).json ({ error: err});
    }
});

// EDIT NOTE

router.put('/:id', validateSession, async (req, res) => {
    const { title, datePlanted, waterSched, light, temp, noteBody } = req.body.note;
    const noteId = req.params.id;

    const query = {
        where : {
            id: noteId,
        }
    };
    const updatedNote = {
        title: title,
        datePlanted: datePlanted, 
        waterSched: waterSched,
        light:light,
        temp:temp,
        noteBody:noteBody
    };
    try {
        const update = await NotesModel.update(updatedNote, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err}) 
       }
});

// I realized we forgot to add a Get One endpoint -_-


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try { 
        const results = await NotesModel.findAll({
            where: { id: id }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});
router.post('/create', validateSession, (req,res) => {
    const {title, datePlanted, waterSched, light, temp, noteBody, } = req.body.note;
    console.log(req.user.id, title, datePlanted, waterSched, light, temp,noteBody, );
    NotesModel.create({
        title,
        datePlanted,
        waterSched,
        light,
        temp,
        noteBody,
        owner_id: req.user.id
    })
    .then(note => res.status(201).json(note))
    .catch(err => res.status(500).json(err))
})
//delete note
router.delete('/delete/:id', validateSession, async (req, res) => {
    const owner_id = req.user.id;
    const note_id = req.params.id;
    try {
        const query = {
            where: {
                id: note_id,
                owner_id: owner_id
            }
        };
    await NotesModel.destroy(query);
    res.status(200).json({message: "Plant Note Removed"});
    } catch (err) {
        res.status(500).json({error:err});
    }
});

module.exports= router