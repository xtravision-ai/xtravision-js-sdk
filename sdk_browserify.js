const browserify = require("browserify")
const fs = require('fs')
browserify("./sdk_wrapper.js", {
  debug : true,
  standalone: "XtraVision",
}).transform(['babelify', { compact: false }], {
  global: true,                                  
  presets: [ 
    "@babel/preset-env",
    "@babel/preset-react"] 
  })
  .bundle().on('error', function (err) {
    console.log(err);  
  })
  .pipe(fs.createWriteStream('demo-app/xtravision-js-sdk.js')).on('end', function(){
    console.log( 'finished writing the browserify file' );
  });
