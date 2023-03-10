const browserify = require("browserify")
const fs = require('fs')
browserify("./dom_front.js", {
  debug : true,
  standalone: "xtra",

}).transform(['babelify', { compact: false }], {
  global: true,                                  
  // ignore: [/\/node_modules\/(?!@vizuaalog\/)/],     
  presets: [ 
    "@babel/preset-env",
    "@babel/preset-react"] 
  }).bundle().on('error', function (err) {
    console.log(err);  
  }).pipe(fs.createWriteStream('bundle/xtravision.js')).on('end', function(){
    console.log( 'finished writing the browserify file' );
  });
