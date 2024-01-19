//to run it first : npm install fs
//npm install csvtojson
//node convert-csv-tojson.js

const csvFilePath = 'V1-19-Jan-2024-Aruba_Products.csv';
const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    const result = jsonObj.map((obj) => {
      const keys = Object.keys(obj);
      const values = Object.values(obj);
      const newObject = {};
      for (let i = 0; i < keys.length; i++) {
        const newKey = keys[i].replace(/ /g, '');
        newObject[newKey] = values[i];
      }
      return newObject;
    });
    const json = JSON.stringify(result);
    fs.writeFileSync('V2-19-Jan-2024-Aruba_Products.json', json);
  });