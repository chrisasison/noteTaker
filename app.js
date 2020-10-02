//npm
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");
const { argv } = require("yargs");
const { listNotes } = require("./notes.js");

//Custom yargs version
yargs.version("1.1.0");

//Create 'add' command
yargs.command({
  command: "add",
  describe: "New note",
  builder: {
    title: {
      described: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      described: "Note content",
      demandOption: true,
      type: "string",
    },
  },
  handler: function () {
    notes.addNotes(argv.title, argv.body);
  },
});

//Create 'remove' command
yargs.command({
  command: "remove",
  describe: "Remove note",
  handler: function () {
    notes.removeNotes(argv.title, argv.body);
  },
});

//Create 'list' Command
yargs.command({
  command: "listNotes",
  describe: "Lists notes",
  handler: function () {
    listNotes();
  },
});

//Create 'read' command
yargs.command({
  command: "readNotes",
  describe: "reads notes",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: function () {
    notes.readNotes(argv.title);
  },
});

yargs.parse();
