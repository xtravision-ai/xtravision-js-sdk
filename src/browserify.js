const browserify = require("browserify");
const fs = require("fs");
const terser = require("terser");
const path = require('path')

const ROOT_PATH = path.join(__dirname, '..')
const DEMO_APP_PATh = path.join(ROOT_PATH, 'examples/demo-app')


// reference: https://github.com/browserify/browserify#browserifyfiles--opts
browserify(path.join(ROOT_PATH, "src/wrapper.js"), {
  debug: true,
  standalone: "XtraVision", // Global namespace
})
  .transform(["babelify", { compact: false }], {
    global: true,
    presets: ["@babel/preset-env", "@babel/preset-react"],
  })
  //Bundle the files and their dependencies into a single javascript file.
  .bundle((err, bundle) => {
    if (err) {
      console.log(err);
      process.exit(0)
    }
    // Minify the bundle using Terser
    terser
      .minify(bundle.toString(), {
        compress: true,
        mangle: true,
      })
      .then((res) => {
        const newCreatedMinifiedFile = "xtravision-js-sdk.min.js"
        const newFilePath = path.join(ROOT_PATH, newCreatedMinifiedFile)
        
        const stream1 = fs.createWriteStream(newFilePath);
        stream1.write(res.code);
        stream1.end();

        stream1.on("close", () => {
          // copy new file in demo app
          fs.copyFileSync(newFilePath, path.join(DEMO_APP_PATh,  newCreatedMinifiedFile))
        })
        
      });
  })
  // Create un-minified file for debugging purpose
  .pipe(fs.createWriteStream("xtravision-js-sdk.js"))
  .on("finish", function () {
    console.log("Finished writing the browserify file");
  });
