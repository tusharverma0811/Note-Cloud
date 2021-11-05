const express = require("express");
const fetchuser = require("../middlewares/fetchuser");
const router = express.Router();
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Get all notes of the current user using : GET '/api/notes/getnotes' (Login required)
router.get("/getnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Some Internal error occured please try again" });
  }
});

//Add a note using : POST '/api/notes/addnote' (Login required)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title should be atleast 3 character").isLength({ min: 3 }),
    body("description", "Description must have atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors return a status of 400 bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Create a new note
    try {
      const note = await Note.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id,
      });

      res.json(note);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Some Internal error occured please try again" });
    }
  }
);

//Update an existing note using : PUT '/api/notes/updatenote'(Login Required)
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  //Make A New Note
  const newNote = {};
  const { title, description } = req.body;

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }

  try {
    //Check If the note exists!
    let note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404).send("Note Not Found");
    }

    //Check if the note belongs to the logged in user or not
    if (note.user.toString() != req.user.id) {
      res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Some Internal Error Occured" });
  }
});

//Delete an existing note using : DELETE '/api/notes/deletenote' (Login Required)

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(400).json({ error: "No Note Found with requested id" });
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401).json({ error: "Invalid Operation for the current user" });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.send("Successfully Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Some Internal Error Occured" });
  }
});
module.exports = router;
