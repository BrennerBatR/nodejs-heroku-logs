var lineReader = require("line-reader");
Promise = require("bluebird");
const fs = require("fs");

let arq = "txt/txt.log";
let vetor = [];
let text = "";
let url = "";
var eachLine = Promise.promisify(lineReader.eachLine);
eachLine(arq, function (line) {
  let bla = line.split("service=");
  if (bla) {
    let part0 = bla[0];
    let ble = part0.split("at=info")[1];
    if (ble) url = ble.split("host=")[0];
    let part1 = bla[1];
    if (part1) {
      let part2 = part1.split("ms")[0];
      if (part2) {
        let aux = parseInt(part2);
        if (aux) vetor.push({ time: aux, url });
      }
    }
  }
})
  .then(function () {
    vetor.sort(function (a, b) {
      if (a.time > b.time) return -1;
      if (a.time < b.time) return 1;
      return 0;
    });

    for (var i = 0; i < 15; i++) {
      text += `\n time=${vetor[i].time} ========> ${vetor[i].url}`;
    }
    fs.writeFile("arquivo.txt", text, (err) => {
      if (err) throw err;
      console.log("O arquivo foi criado!");
    });
  })
  .catch(function (err) {
    console.error(err);
  });
