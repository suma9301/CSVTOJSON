const fs = require("fs");
const parse = require("csv-parser");

const results = [];
const csvFile = "./MOCK_DATA1.csv";
const jsonFile = "./newJSON.json";

fs.createReadStream(csvFile, "utf-8")
  .pipe(parse())
  .on("data", fillingRows)
  .on("end", writeJSONToNewFile)
  .on("error", errorHandler);

function fillingRows(row) {
  results.push(row);
  console.log(results);
}

function errorHandler(err) {
  console.error("Error while parsing CSV", err);
}

function writeJSONToNewFile() {
  const jsonDATA = JSON.stringify(results, null, 2);
  const writestream = fs.createWriteStream(jsonFile);
  writestream.write(jsonDATA, async(err) => {
    if(err) {
      console.error("Error writing in json file", err);
    } else {
      console.log(
        `written in file "newJSON.json" \n No. of records ` + results.length
      );
    }
    writestream.end();
  });
}
