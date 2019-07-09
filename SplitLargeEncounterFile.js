var splitFileStream = require("split-file-stream");
const fs = require('fs');
let maxFileSize = 1000000; // 1000000 bytes per file
let outputPath = __dirname + "/Encounter-file"; // file path partition's prefix
let stream = fs.createReadStream("./encounter.csv");
splitFileStream.split(stream, maxFileSize, outputPath, (filePaths) => {
	console.log("This is an array of my new files:" + filePaths);
	/* stream will be saved to files in the path ∈ { ./outputFiles.split-x | x ∈ N } */
});
