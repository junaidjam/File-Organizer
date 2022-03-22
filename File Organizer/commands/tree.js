const fs = require("fs");

const path = require("path");

function treeFn(dirPath){
    if(dirPath == undefined){
        console.log("Please enter valid Path");
        return;
    }

    let doesExist = fs.existsSync(dirPath);
    if(doesExist == true){
        treeHelper(dirPath," ");
    }
}

function treeHelper(targetPath, indent){
    let isFile = fs.lstatSync(targetPath);
    if(isFile == true){
        let fileName = path.basename(targetPath)
        console.log(indent + "├── " + fileName);
        return;
    }
}

let dirPath = " "
treeFn(dirPath);