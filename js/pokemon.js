
/*async function getPokemonData(url) {
    const response = await fetch('url');
    const myJson = await response.json();
};
*/
//Like a cookie cutter to make more stuff
class Pokemon {
    constructor(id, name) {
      this.id = id;
      this.name = name;
      this.power1 = 'none';
      
    }
  }
  
  const lilguy = new Pokemon(900, 'Your Pokemon');
  const newButton = document.querySelector('#new')
  newButton.addEventListener('click', function() {
    populateDOM(lilguy)
  })
 

// This is how to pull data from an API - This just returns data from the url it's given
async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data;
    }
    catch (error) {
        console.error(error)
    }
}

let allData = []
let simpleData = []

//Now, use the returned async data
const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/')
.then(data => {
    
    for (const pokemon of data.results) {
        getAPIData(pokemon.url) //Returns promise
        .then(pokedata => {
            allData = (data.results)
    simpleData = makeMap(allData)
            populateDOM(pokedata) //Comment this out if you keep making changes and hitting the API
        })
        
      }
})


//Map the data
function makeMap(everyone) {
    let results = everyone.map(data => {
        return {
            id: data.id,
            name: data.name,
           power1: data.abilities,
            type: data.types
        }
    })
    return results
}
    
/*Filter the Data - Do something with this
const poison = data.filter(pokemon => pokemon.type === 'poison')
console.log(poison)
*/


//Setting up the DOM
let mainArea = document.querySelector('main')

function populateDOM(single_pokemon) {
    
//Variables
let pokeScene = document.createElement('div')
let pokeCard = document.createElement('div')
let pokeFront = document.createElement('div')
let pokeBack = document.createElement('div')

fillCardBack(pokeBack, single_pokemon)
fillCardFront(pokeFront, single_pokemon)

//Assigning Value
//Click Function
pokeCard.addEventListener( 'click', function() {
    pokeCard.classList.toggle('is-flipped'); //Adds "is flipped" to end of class name I believe.
  });
 //Set Attributes
pokeScene.setAttribute('class', 'scene')
pokeCard.setAttribute('class', 'card')

//Appending
pokeCard.appendChild(pokeFront)
pokeCard.appendChild(pokeBack)
pokeScene.appendChild(pokeCard)
mainArea.appendChild(pokeScene)    
}


//Array Character Function
function getPokeNumber(id) {

    if(id < 10) return `00${id}`
    if(id > 9 && id < 100) {
        return `0${id}`
    } else return id
}
function fillCardBack(pokeBack, data) {
let backName = document.createElement('h3')
backName.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`

let power1 = document.createElement('p')
power1.textContent = `Main Ability: ${data.abilities[0].ability.name}`
/*let power2 = document.createElement('p')
power2.textContent = `Secondary Ability: ${data.abilities[1].ability.name}`*/



pokeBack.setAttribute('class', 'card__face card__face--back')

pokeBack.appendChild(backName)
pokeBack.appendChild(power1)
//pokeBack.appendChild(power2)


}


function fillCardFront(pokeFront, data) {
    let pokeName = document.createElement('h2')
    let pokePic = document.createElement('img')
    pokePic.setAttribute('class', 'picDivs')

    let pokeNum = getPokeNumber(data.id)

    pokeFront.setAttribute('class', 'charDivs card__face card__face--front')

    pokePic.src = `../Images/${pokeNum}.png`
    pokePic.addEventListener('error', (event) => {
        let badImage = event.target
        badImage.src = "../Images/earth.png"
    })
        pokeName.textContent = `${data.name.toUpperCase()}`

    pokeFront.appendChild(pokePic)
    pokeFront.appendChild(pokeName)
    }
