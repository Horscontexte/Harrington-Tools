const csv = require('fast-csv');
const fs = require('fs');
const {CardGroup, OddsCalculator} = require('poker-odds-calculator');

var stream = fs.createReadStream("./encounter.csv");
let hero;
let vilain;
let path = "01.csv";
let header = "hero,vilain,victory_percentage,loose_percentage,split_percentage\r\n"
fs.writeFile(path);
fs.appendFileSync(path,header, 'utf8');
// 1. Read the CSV and get values
function ReadCSV() {
  csv
    .parseStream(stream, {headers : ["hero","vilain"]})
    .on("data", function(data){
        if (data.hero == '') {

        } else {
        hero = data.hero
        vilain = data.vilain;
        console.log("Info - Une rencontre est trouvé: " + hero + '' + vilain);
        CreateFile(hero, vilain);
      }
      })
    .on("end", function(){
        console.log('Terminados Amigos, bye !')
      })
    .on("error", function(err) {
      console.log(err)
    });
  }

// 2. Create result file
// Création du fichier contenant les résultats
function CreateFile(hero, vilain) {

console.log(hero + '' + vilain)
const player1Cards = CardGroup.fromString(hero);
const player2Cards = CardGroup.fromString(vilain);
const result = OddsCalculator.calculate([player1Cards, player2Cards]);

console.log(`Hero - ${player1Cards} - ${result.equities[0].getEquity()}%`);
console.log(`Vilain - ${player2Cards} - ${result.equities[1].getEquity()}%`);

var split = result.equities[0].getEquity() + result.equities[1].getEquity()
split = 100 - split;
// On ajoute une ligne au fichier avec toutes les informations
var data = hero + ',' + vilain + ',' + result.equities[0].getEquity() + ',' + result.equities[1].getEquity() + ',' + split + '\r\n';
fs.appendFileSync(path,data, 'utf8');
console.log("Document mis à jours avec la rencontre : " + hero + vilain)

}
ReadCSV();
