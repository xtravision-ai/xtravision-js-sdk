const browserify = require("browserify");
const fs = require("fs");
const terser = require("terser");

// reference: https://github.com/browserify/browserify#browserifyfiles--opts
browserify("./sdk_wrapper.js", {
  debug: true,
  standalone: "XtraVision", // Global namespace
})
  .transform(["babelify", { compact: false }], {
    global: true,
    presets: ["@babel/preset-env", "@babel/preset-react"],
  })
  //Bundle the files and their dependencies into a single javascript file.
  .bundle((err, bundle) => {
    if (err) console.log(err);
    // Minify the bundle using Terser
    terser
      .minify(bundle.toString(), {
        compress: true,
        mangle: true,
      })
      .then((res) => {
        const stream1 = fs.createWriteStream("xtravision-js-sdk.min.js");
        stream1.write(res.code);
        stream1.end();
        const stream2 = fs.createWriteStream(
          "demo-app/xtravision-js-sdk.min.js"
        );
        stream2.write(res.code);
        stream2.end();
      });
  })
  // // imp: if we need the non min file for debugging purposes
  // .pipe(fs.createWriteStream("demo-app/xtravision-js-sdk.js"))
  // .on("finish", function () {
  //   console.log("Finished writing the browserify file");
  // })

  .on("finish", function () {
    console.log("Finished writing the browserify file");
  });
