const fs = require('fs');

let cardNumberOne = ['Ac','Ah','Ad','As','Kc','Kh','Kd','Ks','Qc','Qh','Qd','Qs','Jc','Jh','Jd','Js','Tc','Th','Td','Ts','9s','9c','9h','9d',
'8s','8d','8h','8c','7s','7d','7h','7c','6s','6d','6h','6c','5s','5d','5h','5c','4s','4d','4h','4c','3s','3d','3h','3c',
'2s','2d','2h','2c'];
let cardsorder = {
    'A' : 1,
    'K' : 2,
    'Q' : 3,
    'J' : 4,
    'T' : 5,
    '9' : 6,
    '8' : 7,
    '7' : 8,
    '6' : 9,
    '5' : 10,
    '4' : 11,
    '3' : 12,
    '2' : 13
}

let cardNumberTwo = cardNumberOne;
let player1Combo = [];
let heroHandCard1;
let heroHandCard2;
let vilainHandCard1;
let vilainHandCard2;

// Création du fichier contenant toute les rencontres possibles
let encouterFile = 'encounter.csv'
let encouterData;
let encouterHeader = 'encounter'
fs.writeFile(encouterFile);
fs.appendFileSync(path, encouterHeader, 'utf8');

const getAllCombo = () => {
  cardNumberOne.forEach(function(card) {
    cardNumberTwo.forEach(function(element) {
      // If both cards are the same we dont create a combo
      if (card == element) {
        console.log('Rencontre impossile, 2x la même carte !');
      } else {
        console.log(card + element)
        player1Combo.push(card + element)
      }
    });
  });
}

const getAllConfrontation = () => {
  let player2Combo = player1Combo
  player1Combo.forEach(function(wombo) {
    player2Combo.forEach(function(combo) {
      // On découpe les mains :
      // - 1er et 2eme charactère pour la première carte
      // - 3eme et 4eme charactère pour la seconde carte
      let heroHandCard1 = wombo.charAt(0) + wombo.charAt(1);
      let heroHandCard2 = wombo.charAt(2) + wombo.charAt(3);
      let vilainHandCard1 = combo.charAt(0) + combo.charAt(1);
      let vilainHandCard2 = combo.charAt(2) + combo.charAt(3);
      // Si les deux combinaisons sont similaire
      if (wombo == combo) {
        console.log('Rencontre impossible entre la main de Hero et Vilain :' + wombo + '-' + combo);
      // Si la carte 1 de hero est égale à la carte 1 ou 2 de vilain
      } else if (heroHandCard1 == vilainHandCard1 || heroHandCard1 == vilainHandCard2){
        console.log('Rencontre impossible entre Hero et Vilain :' + heroHandCard1 + '-' + vilainHandCard1 + ' ou ' + heroHandCard1 + '-' + vilainHandCard2);
      // Si la carte 2 de hero est égale à la carte 1 ou 2 de vilain
      } else if (heroHandCard2 == vilainHandCard1 || heroHandCard2 == vilainHandCard2){
        console.log('Rencontre impossible entre Hero et Vilain :' + heroHandCard2 + '-' + vilainHandCard1 + ' ou ' + heroHandCard2 + '-' + vilainHandCard2)
      } else {

        // Vérification de la formation des combo (Respect de l'ordre)
        //                                           exemple: A2 = OK
        //                                                    2A = Not OK
        let eheroHandCard1 = wombo.charAt(0);
        let eheroHandCard2 = wombo.charAt(2);
        let evilainHandCard1 = combo.charAt(0);
        let evilainHandCard2 = combo.charAt(2);
        let c1 = cardsorder[eheroHandCard1]
        let c2 = cardsorder[eheroHandCard2]
        let parsedc1 = parseInt(c1)
        let parsedc2 = parseInt(c2)
        let c3 = cardsorder[evilainHandCard1]
        let c4 = cardsorder[evilainHandCard2]

        if (c1 > c2) {
          console.log('BAD COMBO : ' + eheroHandCard1 + eheroHandCard2)
        } else if ( c3 > c4) {
          console.log('BAD COMBO : ' + evilainHandCard1 + evilainHandCard2)
        }
        else {
          var encouterData = wombo + ',' + combo + "\r\n";
          fs.appendFileSync(encouterFile, encouterData, 'utf8');
          console.log("Document mis à jours avec la rencontre : " + wombo + combo);
        }

      }
    });
  });
}

async function asyncCall() {
  await getAllCombo();
  await getAllConfrontation();
}

asyncCall();
