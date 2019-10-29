
/*async function getPokemonData(url) {
    const response = await fetch('url');
    const myJson = await response.json();
};
*/
// This is how to pull data from an API
async function getPokemonData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        populateDOM(data.results)
    }
    catch (error) {
        console.error(error)
    }

}
getPokemonData('https://pokeapi.co/api/v2/pokemon/')




//Setting up the DOM
let mainArea = document.querySelector('main')

function populateDOM(pArr) {
    pArr.forEach(pokemon => {
        console.log(pokemon)
//Variables
let pokeDiv = document.createElement('div')
let pokeName = document.createElement('h1')
let pokePic = document.createElement('img')
let pokeNum = getPokeNumber(pokemon.url);

//Assigning Value
pokeName.textContent = pokemon.name
pokePic.src = `..images/${pokeNum}.png`
pokePic.addEventListener('error', (event) => {
            let badImage = event.target
            badImage.src = "../Images/earth.png"
        })

//Appending

pokeDiv.appendChild(pokeName)
pokeDiv.appendChild(pokePic)
mainArea.appendChild(pokeDiv)

    })
}

//Array Character Function
function getPokeNumber(charURL) {
    let end = charURL.lastIndexOf('/')
    let charID = charURL.substring(end - 2, end)
    if (charID.indexOf('/') !== -1) {
        return `00${charID.slice(1, 2)}`

    } else {
        return `0${charID}`
    }

}

