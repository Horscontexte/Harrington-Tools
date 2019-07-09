const axios = require('axios');
const csv = require('fast-csv');
const fs = require('fs');

// Poker_Equity_Results.csv
var stream = fs.createReadStream("./test.csv");
let title;
let hero;
let vilain;
let vilain_pourcentage;
let loose_pourcentage;
let split;

// 1. Read the CSV and get values
function ReadCSV () {
  csv
    .parseStream(stream, {headers : ["hero","vilain","victory_percentage","loose_percentage","split_percentage"]})
    .on("data", function(data){
        title = data.hero + data.vilain
        hero = data.hero;
        vilain = data.vilain;
        victory_percentage = data.victory_percentage;
        loose_percentage = data.loose_percentage;
        split = data.split_percentage;
        console.log("Info - Une rencontre est trouvé: " + title);
        createEquity();
      })
    .on("end", function(){
        console.log('Terminados Amigos, bye !')
      })
    .on("error", function(err) {
      console.log(err)
    });
  }

// 2. Create a equity record into mongoBDD
function createEquity() {
  axios.post('http://localhost:3000/equitys/',{
    title: title,
    heroHand: hero,
    vilainHand: vilain,
    heroEquity: victory_percentage,
    vilainEquity: loose_percentage,
    splitEquity: split

  })
  .then(response => {
    console.log("Info - creating : " + response.data.title)
  })
  .catch(error => {
    console.log("Error - While creating", error);
  });

}

// 4. Start script
ReadCSV();
