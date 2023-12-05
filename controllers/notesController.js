const asyncHandler = require("express-async-handler");
const Note = require("../models/notesModel");

const createNote = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please enter all the text fields");
  }

  const { title, desc, text } = req.body;
  const note = await Note.create({
    title,
    desc,
    text,
    user: req.user.id,
  });
  res.status(201).send(note);
});

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).send(notes);
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(updatedNote);
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }
  //check if such user is there
  if (!req.user) {
    res.status(400);
    throw new Error("user not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deletedNote = await Note.deleteOne({ _id: req.params.id });
  res.status(200).send({ id: req.params.id });
});

module.exports = { createNote, getNotes, updateNote, deleteNote };
