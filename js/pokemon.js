/*async function getPokemonData(url) {
    const response = await fetch('url');
    const myJson = await response.json();
};
*/
//Constructor
class Pokemon {
    constructor(id, name, abilities, types) {
      this.id = 900
      this.name = name
  
      this.abilities = abilities
      this.types = types
    }
  }
  //let abilities =[]
  const lilguy = new Pokemon(
    900,
    'Your Pokemon',
    [{ ability: { name: 'everything' } }],
    [{ type: { name: 'water' } }],
  )
  
  //BUTTONS
  //Pull in new pokemon button
  const newButton = document.querySelector('#new')
  newButton.addEventListener('click', function() {
    let pokemonId = prompt('Enter Pokemon ID')
  
    if (pokemonId > 0 && pokemonId <= 807) {
      getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(
        result => {
          populateDOM(result)
        },
      )
    } else {
      alert('That is not a valid ID') //TODO Find a framework that alert
    }
  })
  
  //Custom Card button
  const customButton = document.querySelector('#custom')
  customButton.addEventListener('click', function() {
    populateDOM(lilguy)
  })
  
  // This is how to pull data from an API - This just returns data from the url it's given
  async function getAPIData(url) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }
  
  let allData = []
  let poisonPokemon = []
  //let simpleData = []
  //Now, use the returned async data
  const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/?limit=25').then(
    data => {
      for (const pokemon of data.results) {
        getAPIData(pokemon.url) //Returns promise
          .then(pokedata => {
            allData = data.results
            //simpleData = makeMap(allData)
            populateDOM(pokedata) //Comment this out if you keep making changes and hitting the API
            if (makeFilter(pokedata, 'poison')) {
              poisonPokemon.push(pokedata)
            }
          })
      }
    },
  )
  
  console.log(poisonPokemon)
  
  //Map the data
  function makeMap(everyone) {
      let results = everyone.map(data => {
          return {
              id: data.id,
              name: data.name,
             ability: data.abilities,
              types: data.types
          }
      })
      return results
  }
    
  
  //Filter the Data - Do something with this
  function makeFilter(pokedata, pokeType) {
    let foundMatch = pokedata.types.filter(
        itemType => itemType.type.name === pokeType)
    if (foundMatch.length !== 0) {
      return true
    }
  }
  
  // This creates a new array that you can then display. Maybe use a button to do it
  const filterButton = document.querySelector('#filter')
customButton.addEventListener('click', function () {
    populateDOM(poisonPokemon)
poisonPokemon.setAttribute('style', 'background-color: green')
})
  
  //Setting up the DOM
  let mainArea = document.querySelector('main')
  
  function populateDOM(single_pokemon) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')
  
    fillCardBack(pokeBack, single_pokemon)
    fillCardFront(pokeFront, single_pokemon)
  
    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')
  
    //Click Function
    pokeCard.addEventListener('click', function() {
      pokeCard.classList.toggle('is-flipped') //Adds "is flipped" to end of class name I believe.
    })
  
    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
    mainArea.appendChild(pokeScene)
  }
  
  //Back of Card Configuration
  function fillCardBack(pokeBack, data) {
    let backName = document.createElement('h3')
    backName.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`
  
    let power1 = document.createElement('p')
    power1.textContent = `Main Ability: ${data.abilities[0].ability.name}`
    let type1 = document.createElement('p')
    type1.textContent = `Type: ${data.types[0].type.name}`
  
    pokeBack.setAttribute('class', 'card__face card__face--back')
  
    pokeBack.appendChild(backName)
    pokeBack.appendChild(power1)
    pokeBack.appendChild(type1)
  }
  
  //Front of Card Configuration
  function fillCardFront(pokeFront, data) {
    let pokeName = document.createElement('h2')
    let pokePic = document.createElement('img')
    pokePic.setAttribute('ID', 'picDivs')
    pokePic.setAttribute('class', 'animated zoomIn')
  
    let pokeNum = getPokeNumber(data.id)
  
    pokeFront.setAttribute('class', 'charDivs card__face card__face--front')
  
    pokePic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`
    pokePic.addEventListener('error', event => {
      let badImage = event.target
      badImage.src = '../Images/900.png'
    })
    pokeName.textContent = `${data.name.toUpperCase()}`
  
    pokeFront.appendChild(pokePic)
    pokeFront.appendChild(pokeName)
  }
  
  //Array Character Function
  function getPokeNumber(id) {
    if (id < 10) return `00${id}`
    if (id > 9 && id < 100) {
      return `0${id}`
    } else return id
  }
