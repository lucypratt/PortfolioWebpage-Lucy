
/*async function getPokemonData(url) {
    const response = await fetch('url');
    const myJson = await response.json();
};
*/
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

//Now, use the returned async data
const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/')
.then(data => {
    for (const pokemon of data.results) {
        getAPIData(pokemon.url) //Returns promise
        .then(pokedata => {
            populateDOM(pokedata) //Comment this out if you keep making changes and hitting the API
        })
      }
})

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
    pokeCard.classList.toggle('is-flipped');
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

    /*let end = charURL.lastIndexOf('/')
    let charID = charURL.substring(end - 2, end)
    if (charID.indexOf('/') !== -1) {
        return `00${charID.slice(1, 2)}`

    } else {
        return `0${charID}`
    }*/

    
}
function fillCardBack(pokeBack, data) {
let pokeOrder = document.createElement('p')
let pokeHP = document.createElement('h5')

pokeOrder.textContent = data.order
pokeHP.textContent = data.stats[0].base_stat
pokeBack.setAttribute('class', 'card__face card__face--back')

pokeBack.appendChild(pokeOrder)
pokeBack.appendChild(pokeHP)
}


function fillCardFront(pokeFront, data) {
    let pokeName = document.createElement('h1')
    let pokePic = document.createElement('img')
    pokePic.setAttribute('class', 'picDivs')

    let pokeNum = getPokeNumber(data.id)

    pokeFront.setAttribute('class', 'charDivs card__face card__face--front')

    pokePic.src = `../Images/${pokeNum}.png`
    pokePic.addEventListener('error', (event) => {
        let badImage = event.target
        badImage.src = "../Images/earth.png"
    })
    pokeName.textContent = `${data.name} height: ${data.height}`

    pokeFront.appendChild(pokePic)
    pokeFront.appendChild(pokeName)
    }
