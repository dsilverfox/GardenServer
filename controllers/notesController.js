const { query} = require('express');
const Express = require('express');
const router = Express.Router();
const {Note} = require('../models');
let validateSession = require("./middleware/validateSession");



//Create note 

router.post('/create', validateSession, (req,res) => {
    const {title, datePlanted, waterSched, light, temp, noteBody} = req.body.note;
    console.log(req.user.id, title, datePlanted, waterSched, light, temp,noteBody, );

    Note.create({
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
                note_id: note_id,
                owner_id: owner_id
            }
        };
    


    await Note.destroy(query);
    res.status(200).json({message: "Plant Note Removed"});

    } catch (err) {
        res.status(500).json({error:err});
    }
    
});

module.exports = router;