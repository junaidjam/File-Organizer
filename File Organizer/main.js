//entry point of my command line

let helpfunc = require("./commands/help");
let orgfunc = require("./commands/organize");
// console.log(helpfunc.ghoda);

let inputarr = process.argv.slice(2);
let command = inputarr[0];
let path = inputarr[1];
switch (command) {
    case "tree":
        //call tree function
        console.log("tree function executed successfully" + path);
        break;
    case "organize":
        //call organize function
        // console.log("tree function executed successfully" + path);
        orgfunc.organize(path)
        break;
    case "help":
        //call help function
        helpfunc.help();
        break;
    default:
        console.log("command not recognized");
        break;
}