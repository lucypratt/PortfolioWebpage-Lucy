import { planets } from '../assets/planets.js';
import { species } from '../assets/species.js';

console.log(planets);
console.log(species);
let mainArea = document.querySelector('main');
let firstArea = document.createElement('div')
let secondArea = document.createElement('div');

//Planets
planets.forEach(function(planet) {

    //Variables
let planetsDiv = document.createElement('div');
let planetName = document.createElement('h1');
let planetTerrain = document.createElement('p');
let planetPic = document.createElement('img');
let charNum = getCharNumber(planet.url);

//Assigning Value
planetName.textContent = planet.name;
planetTerrain.textContent = 'Terrain: ' + planet.terrain;
planetPic.src = `https://starwars-visualguide.com/assets/img/planets/${charNum}.jpg`;
planetPic.addEventListener('error', (event) => {
    let badImage = event.target;
    badImage.src="../Images/earth.png";
});

//Appending
firstArea.appendChild(planetsDiv);
planetsDiv.appendChild(planetName);
planetsDiv.appendChild(planetTerrain);
planetsDiv.appendChild(planetPic);

//Attributes
planetsDiv.setAttribute('class', 'planetsDiv')
planetPic.setAttribute('class', 'planetPic');
planetName.setAttribute('class', 'animated fadeIn delay-2s');

})


//Array Character Function
function getCharNumber(charURL) {
    let end = charURL.lastIndexOf('/');
  let charID = charURL.substring(end -2, end);
  if(charID.indexOf('/') !== -1 ) {
      return charID.slice(1,2);

  } else {
      return charID;
  }
  
}

//Species
species.forEach(function(s) {
    //Variables
    let sDiv = document.createElement('div');
    let sName = document.createElement('h1');
    let sClassification = document.createElement('h3');
    let sHomeworld = document.createElement('img');
    let sLanguage = document.createElement('p');
    let sPic = document.createElement('img');
    let charNum = getCharNumber(s.url);
    let picDiv = document.createElement('div');
    
    //Assigning Value
    sName.textContent = s.name;
    sClassification.textContent = 'Classification: ' + s.classification;
    sHomeworld.src = `https://starwars-visualguide.com/assets/img/planets/${charNum}.jpg`;
    sLanguage.textContent = 'Spoken Language: ' + s.language;
    sPic.src = `https://starwars-visualguide.com/assets/img/species/${charNum}.jpg`;
    
    //Appending
    secondArea.appendChild(sDiv);
    sDiv.appendChild(sName);
    sDiv.appendChild(sClassification);
    sDiv.appendChild(sLanguage);
    sDiv.appendChild(picDiv);
    picDiv.appendChild(sPic);
    picDiv.appendChild(sHomeworld);
    
    
    //Attributes
    sDiv.setAttribute('class', 'sDiv');
    sHomeworld.setAttribute('id', 'sHomeworld');
    sPic.setAttribute('id', 'sPic');
    picDiv.setAttribute('class', 'picDiv');
    sHomeworld.addEventListener('error', (event) => {
        let badImage = event.target;
        badImage.src="../Images/earth.png";
    });
   
    
    })
    mainArea.appendChild(firstArea);
    mainArea.appendChild(secondArea);
   
    secondArea.setAttribute('class', 'secondArea');
    firstArea.setAttribute('class', 'firstArea');

