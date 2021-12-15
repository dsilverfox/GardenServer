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

module.exports= router