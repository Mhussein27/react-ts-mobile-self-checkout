//This file to tranform Image extension from anything to .jpg
// first : npm install fs
//npm install path
// then to run it : node extrename.js

const fs = require('fs');
const path = require('path');

// Define the folder path
//const folderPath = '/path/to/folder';

//change path
const folderPath = '/Users/mahasallam/react-ts-mobile-self-checkout/public/imgs/Aruba';


// Read the contents of the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading the folder: ', err);
    return;
  }

  // Loop through each file in the folder
  files.forEach((file) => {
    // Get the file extension
    const ext = path.extname(file);

    // Check if the file extension is not .jpg
    if (ext !== '.jpg') {
      // Build the new file name with .jpg extension
      const newFile = path.join(folderPath, path.basename(file, ext) + '.jpg');

      // Rename the file
      fs.rename(path.join(folderPath, file), newFile, (err) => {
        if (err) {
          console.error('Error renaming the file: ', err);
          return;
        }
        console.log(`File ${file} has been renamed to ${path.basename(newFile)}`);
      });
    }
  });
});