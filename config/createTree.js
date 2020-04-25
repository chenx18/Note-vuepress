const fs = require('fs');
const path = require('path');
const basePath ='../docs/notes';
console.log(basePath)

//遍历文件夹，获取所有文件夹里面的文件信息

function geFileList(path) {
  var filesList = [];
  var targetObj = {};
  console.log(10,path)
  readFile(path, filesList, targetObj);
  return filesList;
}

//遍历读取文件
function readFile(path, filesList, targetObj) {
  files = fs.readdirSync(path); //需要用到同步读取
  files.forEach(walk);
  function walk(file) {
    states = fs.statSync(path + '/' + file);
    if (states.isDirectory()) {
      var item;
      if (targetObj["children"]) {
        item = {
          title: file,
          collapsable: true,
          children: []
        };
        targetObj["children"].push(item);
      } else {
        item = {
          title: file,
          collapsable: true,
          children: []
        };
        filesList.push(item);
      }
      readFile(path + '/' + file, filesList, item);
    } else {
      let _size = states.size;               //文件大小，以字节为单位
      let _name = file.replace('.md', '');
      let _path = `${path}/${_name}`.replace('../docs','')
      

      if (targetObj["children"]) {
        var item = [_path,_name]
        targetObj["children"].push(item);
      } else {
        var item = [_path,_name];
        filesList.push(item);
      }
    }
  }
}

//写入文件utf-8格式
function writeFile(fileName, data) {
  fs.writeFile(fileName, data, 'utf-8',(err)=>{
    console.log(err)
    return;
  })
}


// function createTree(){
  let filesList = geFileList(basePath);
  let str = 'module.exports='+JSON.stringify(filesList);
  writeFile("sidebar.js", str);
// }

// export default createTree

