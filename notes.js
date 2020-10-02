//Allows us to use file system
const fs = require("fs");
const chalk = require('chalk');

//Show all notes within notes.json
const getNotes = function () {
  return "Your notes...";
};

//Add new note
const addNotes = (title, body) => {
  //Loads notes that we currently have saved
  const notes = loadNotes();
  //Checks the notes for any duplicates by comparing titles of saved notes and the note attempting to be added. If they are the same, it is stored in the duplicateNotes variable.
  const duplicateNotes = notes.filter(note => note.title === title);
  //If nothing is returned to duplicate notes
  if (duplicateNotes.length === 0) {
    //push the note to the notes array and save it to json.
    notes.push({
      title: title,
      body: body
    })
    savedNotes(notes);
    console.log(chalk.green('New note ADDED'));
  } else {
    //Alert the duplicate.
    console.log(chalk.red('Existing note title.'));
  }
}

const removeNotes = function(title) {
  //Loads notes that we currently have saved
  const notes = loadNotes();
  //pop the note off the notes array and save the modified JSON.
  notes.pop({
    title: this.title,
    body: this.body
  });
  savedNotes(notes);
  console.log(chalk.red.inverse('Notes REMOVED'));
}
  
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your Notes...'));
  notes.forEach((note) => {
    console.log(note.title);
  })
}

const readNotes = function(title) {
  // find and print the title and body
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
     //No note returns an error
    console.log(chalk.red('Note not found!'));
  }
} 


const savedNotes = notes => {
  //Turns notes into JSON and writes it in notes.json file.
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', notesJSON);
}

const loadNotes = () => {
  try {
    //Look for existing notes.json file. If file exists, turn it to string and parse JSON. Returned the parsed notesJSON.
    const dataBuffer = fs.readFileSync('notes.json');
    const notesJSON = dataBuffer.toString();
    return JSON.parse(notesJSON);
  } catch (e) {
    //If file does not exist, return a blank array so notes can be added.
    return [];
  }
}

//Allow app.js to use these functions.
module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes
}
