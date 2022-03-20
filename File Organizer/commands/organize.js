const { Console } = require("console");
const fs = require("fs");// fs module
const { type } = require("os");
const path = require("path"); //path module
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['png','jpg','jpeg']
}

function organize(srcPath) {

    //1st step :-  to check if srcPath is present
    if(srcPath == undefined){
        //the process.cwd() method returns the current working diretory of the node.js process.
        //console.log("srcPath"); //undefined
        srcPath = process.cwd();
        // console.log("source Path is ", srcPath);
    }


    // 2nd step:- to create a directory --> organized_files
    let organizedFiles = path.join(srcPath , "organized_files");
    // console.log("organized files folder path is ", organizedFiles);
    if(fs.existsSync(organizedFiles) == false){
        fs.mkdirSync(organizedFiles);
    }
    else console.log('folder already exist');


    //3rd step:- scan the entire source path(downloads folder in the path)
    let allfiles = fs.readdirSync(srcPath);
    // console.log(allfiles);

    //4th step:- traverse over all the files and classify then on the basis of their extension
    for(let i = 0;i<allfiles.length;i++){
        let ext = allfiles[i].split(".")[1];
        // let ext = path.extname(allfiles[i]);
        //console.log(ext);
        let fullPathOfFile = path.join(srcPath,allfiles[i]);
        //console.log(fullPathOfFile);
        //1. check if it is a file or folder
        // lstatsSync gives the information regarding the link provided 
        let isFile = fs.lstatSync(fullPathOfFile).isFile();
        if(isFile){
            //1.1 get ext name
            let ext = path.extname(allfiles[i]).split(".")[1];
            // console.log(ext);
            //1.2 get folder name from entension
            let folderName = getFolderName(ext);
            // console.log(folderName);
            //copy from source folder(srcPath) and paste in dest folder
            copyFileToDest(srcPath,fullPathOfFile,folderName);
        }
    }

}

function getFolderName(ext){
    for(let key in types) {
        for(let i = 0;i<types[key].length;i++){
            if(types[key][i] == ext){
                return key;
            }
        }
    }
    return "miscellaneous";
}

function copyFileToDest(srcPath,fullPathOfFile,folderName) {
    //1.foldername ka path bnana hai
    let destFolderPath = path.join(srcPath,"organized_files",folderName);  //.......downloads//organized_files//folderName.
    //2.check if file exist or not , if not then makeit
    if (!fs.existsSync(destFolderPath)) {
        fs.mkdirSync(destFolderPath);
    }
    //3. copy file from srcfolder to destfolder
    //return last portio of the path
    let fileName = path.basename(fullPathOfFile);
    let destFileName = path.join(destFolderPath , fileName);
    fs.copyFileSync(fullPathOfFile , destFileName)

}


// let srcPath = "F:\\(4)-NOG\\File Organizer\\downloads"
// organize(srcPath);

module.exports = {
    organize:organize
}
