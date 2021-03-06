const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require('uuid');

router.get("/notes", (req, res) => {
    fs.readFile("db/db.json", function (error, data) {
        var notes = JSON.parse(data)
        if (error) {
            console.log(error);
        }
        res.send(notes);
    });
});
router.post("/notes", (req, res) => {
    var { title, text } = req.body;
    var newNote = { title, text, id: uuid() }


    fs.readFile("db/db.json", function (error, data) {
        var notes = JSON.parse(data)
        if (error) {
            console.log(error);
        }
        notes.push(newNote)
        fs.writeFile("db/db.json", JSON.stringify(notes), function (error) {
            if (error) {
                console.log(error);
            }
        })
        res.send(notes);
    });
})
router.delete("/notes/:id", (req, res) => {
    var id = parseInt(req.params.id);

    fs.readFile("db/db.json", function (error, data) {
        var notes = JSON.parse(data)
        if (error) {
            console.log(error);
        }
        var updatedNotes = notes.filter(note => { note.id !== id })
        fs.writeFile("db/db.json", JSON.stringify(updatedNotes), function (error) {
            if (error) {
                console.log(error);
            }
        })
        res.send(updatedNotes);
    });
});

module.exports = router;