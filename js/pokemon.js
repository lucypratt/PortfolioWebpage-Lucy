
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
let pokeName = document.createElement('h1')
let pokePic = document.createElement('img')
let height = document.createElement('p')
let pokeNum = getPokeNumber(single_pokemon.id)

//Assigning Value
pokeName.textContent = single_pokemon.name
pokePic.src = `../Images/${pokeNum}.png`
pokePic.addEventListener('error', (event) => {
            let badImage = event.target
            badImage.src = "../Images/earth.png"
        })

pokeName.textContent = `${single_pokemon.name} height: ${single_pokemon.height}`
 //Set Attributes
pokeFront.setAttribute('class', 'charDivs card__face card__face--front')
pokeBack.setAttribute('class', 'card__face card__face--back')
pokePic.setAttribute('class', 'picDivs')
pokeScene.setAttribute('class', 'scene')
pokeCard.setAttribute('class', 'card')

//Appending
pokeFront.appendChild(pokePic)
pokeFront.appendChild(pokeName)

pokeCard.appendChild(pokeFront)
pokeCard.appendChild(pokeBack)

pokeScene.appendChild(pokeCard)

mainArea.appendChild(pokeScene)    
}

//Click Function
 pokeCard.addEventListener( 'click', function() {
    pokeCard.classList.toggle('is-flipped');
});


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

