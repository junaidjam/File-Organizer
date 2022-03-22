const fs = require("fs");

const path = require("path");

function treeFn(dirPath){
    if(dirPath == undefined){
        console.log("Please enter valid Path");
        return;
    }

    let doesExist = fs.existsSync(dirPath);
    if(doesExist == true){
        treeHelper(dirPath, " ");
    }
}

function treeHelper(targetPath, indent){
    let isFile = fs.lstatSync(targetPath).isFile();
    if(isFile == true){
        let fileName = path.basename(targetPath)
        console.log(indent + "├── " + fileName);
        return;
    }

    let dirName = path.basename(targetPath);
    console.log(indent + "└──" + dirName);

    
}

let dirPath = "F:\\(5)-POG\\FILE_ORGANIZER\\File Organizer\\downloads"
treeFn(dirPath);