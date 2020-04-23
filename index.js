const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

const rhinoLibDir = "./";
let config = require('./config')
let jsFileDir = "./jsList";
const jsc = "org.mozilla.javascript.tools.jsc.Main";

let dexPath = "./dex";
if (!fs.existsSync(dexPath)) {
  fs.mkdirSync(dexPath);
}
delDir(dexPath);

const jsFiles = fs.readdirSync(jsFileDir);
let jsFilesStr = "";
jsFiles.forEach((jsFile) => {
  console.log(jsFile);
  if (path.extname(jsFile) === ".js") {
    jsFilesStr += `"${path.join(jsFileDir, jsFile)}" `;
  }
});

console.log("rhinoLibDir =");
console.log(rhinoLibDir);
console.log("jsc =");
console.log(jsc);
console.log("jsFilesStr =");
console.log(jsFilesStr);

let cmd = `cd ${rhinoLibDir} & java ${jsc} ${jsFilesStr}`;
let cb = function (error, stdout, stderr) {
  console.log(stdout);
  console.log("js -> class 完成");
  class2Dex();
};
exec(cmd, cb);
console.log("exec后面的代码");

function class2Dex() {
  let classFileDir = jsFileDir;
  const classFiles = fs.readdirSync(classFileDir);
  let classFileList = [];
  classFiles.forEach((classFile) => {
    console.log(classFile);
    if (path.extname(classFile) === ".class") {
      classFileList.push(`${path.join(classFile)}`);
    }
  });
  console.log(classFileList);
  // [ 'jsList\\aaa.class', 'jsList\\bbb.class', 'jsList\\ccc.class' ]

  console.log(dexPath)
  dexPath = path.join("..", dexPath);
  console.log(dexPath);
  console.log('jsFileDir =')
  console.log(jsFileDir)
  jsFileDir = path.resolve(jsFileDir)
  let ClasscList = [`cd ${jsFileDir}`];
  classFileList.map((classFile) => {
    let baseName = path.basename(classFile, ".class");
    let Classc = `${config.dxAbsolutePath} --dex --output =${baseName}.dex  ${classFile}`;
    ClasscList.push(Classc)
  });
  console.log(ClasscList);
  let cmd = ClasscList.join(' && ');
  console.log('cmd =')
  console.log(cmd)
  let cb = function (error, stdout, stderr) {
    console.log(stdout);
    console.log("class -> dex 完成");
  };
  exec(cmd, cb);
}



// dx --dex --output =F:\myGithub\batchJs2Dex\jsList\aaa.dex  aaa.class
// dx --dex --output =./aaaaaaaaaaa.dex  aaa.class

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
  }
}
