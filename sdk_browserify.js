const browserify = require("browserify")
const fs = require('fs')

// reference: https://github.com/browserify/browserify#browserifyfiles--opts
browserify("./sdk_wrapper.js", {
  debug : true,
  standalone: "XtraVision", // Global namespace 
  })
  .transform(['babelify', { compact: false }], {
    global: true,                                  
    presets: [ 
      "@babel/preset-env",
      "@babel/preset-react"] 
  })
  //Bundle the files and their dependencies into a single javascript file.
  .bundle().on('error', function (err) {
    console.error(err);  
  })
  .pipe(fs.createWriteStream('demo-app/xtravision-js-sdk.js')).on('finish', function(){
    console.log( 'Finished writing the browserify file' );
  });
