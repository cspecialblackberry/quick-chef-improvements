const searchBtn = document.querySelector('#recipe-search');
const ingredientsInput = document.querySelector('#ingredients')
const timeSlider = document.querySelector('#time-slider')
const timeSliderLabel = document.querySelector('#time-slider-label')
const intolerancesCheckBox = document.querySelector('#intolerances')
const recipesContainer = document.querySelector('#recipes-container');
const myFavorites = document.querySelector('#favorites');
const searchContainer = document.querySelector('#search-container');
const pageButtonContainer = document.querySelector('#page-button-container')

const updateTime = () => {
    timeSliderLabel.textContent = timeSlider.value
}

timeSlider.addEventListener('input', updateTime)

let recipeID;
let pageIndex = 0

let userSelections = {
    includeIngredients: [],
    intolerances: [],
    maxReadyTime: 0
}

const setUserSelections = (event) => {
    userSelections.includeIngredients = ingredientsInput.value.split(' ')
    userSelections.maxReadyTime = timeSlider.value
    userSelections.intolerances = intolerancesCheckBox.value.split(' ')
    // ingredientsInput.value = ''
    // timeSlider.value = 30
}

searchBtn.addEventListener('click', setUserSelections)

const findRecipes = () => {
    createQueryFilters(userSelections);
}

searchBtn.addEventListener('click', findRecipes);

let baseURL

const getRecipes = async () => {
    const response = await fetch(baseURL)
    const data = await response.json()
    clearResultArea()
    createPageButtons()
    data.results.forEach(displayRecipes)
}

const joinFilters = (queryFilters) => {
    let newQueryFilters = queryFilters.slice(0, -1)
    baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=44a9304fedc34c139bfc7622b4d3e00c&instructionsRequired=true&offset=${pageIndex}`
    baseURL += newQueryFilters
    getRecipes(baseURL)
}

const createQueryFilters = (selection) => {

    let queryFilters = `&`

    for (key in selection) {
        if (key === 'includeIngredients' && selection[key] != '') {
            queryFilters += `${key}=${selection[key].join(',+')}&`
        } else if (key === 'intolerances' && selection[key] != '') {
            queryFilters += `${key}=${selection[key].join(',+')}&`
        } else if (key === 'maxReadyTime' && selection[key] != 0) {
            queryFilters += `${key}=${selection[key]}&`
        }
    }

    joinFilters(queryFilters)
}

const saveClickedID = (event) => {
    recipeID = event.target.parentElement.id
    getSpecificRecipe(recipeID)
}

const getSpecificRecipe = async (recipeID) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=44a9304fedc34c139bfc7622b4d3e00c`)
    const data = await response.json()
    console.log(data)
    clearResultArea()
    clearPageButtonArea()
    displaySpecificRecipe(data)
}

const clearResultArea = () => {
    recipesContainer.textContent = '';
}

const clearSearchArea = () => {
    searchContainer.textContent = '';
}

const clearPageButtonArea = () => {
    pageButtonContainer.textContent = ''
}

const runNextPage = () => {
    pageIndex+=10
    createQueryFilters()
    clearPageButtonArea()
}

const runPreviousPage = () => {
    pageIndex-=10
    createQueryFilters()
    clearPageButtonArea()
}

const createPageButtons = () => {
    const nextButton = document.createElement('button')
    nextButton.textContent = 'next'
    nextButton.addEventListener('click', runNextPage)
    pageButtonContainer.appendChild(nextButton)

    if (pageIndex > 0) {
        const prevButton = document.createElement('button')
        prevButton.textContent = 'previous'
        prevButton.addEventListener('click', runPreviousPage)
        pageButtonContainer.appendChild(prevButton)
    }
}

const displayRecipes = (data) => {
    const recipeInfoEl = document.createElement('article');
    const recipeName = document.createElement('h2');
    recipeName.innerHTML = `<button>${data.title}</button>`;
    recipeName.setAttribute('id', data.id)
    recipeName.setAttribute('class', 'recipe-name')
    recipeName.addEventListener('click', saveClickedID)
    const recipeImage = document.createElement('img');

    recipeImage.src = data.image;

    recipesContainer.appendChild(recipeInfoEl);
    recipeInfoEl.appendChild(recipeName);
    recipeInfoEl.appendChild(recipeImage);
}

const displaySpecificRecipe = (data) => {
    const backButton = document.createElement('button')
    backButton.textContent = 'back'
    backButton.addEventListener('click', getRecipes)
    backButton.addEventListener('click', clearPageButtonArea)
    pageButtonContainer.appendChild(backButton)

    const recipeInfoEl = document.createElement('article')
    const recipeName = document.createElement('h2')
    const favoriteButton = document.createElement('button');
    favoriteButton.setAttribute('class', 'favorite-button');
    const cookTime = document.createElement('p')
    const dietsTitle = document.createElement('h3')
    const diets = document.createElement('ul')
    const recipeImage = document.createElement('img')
    const ingredientsTitle = document.createElement('h3')
    const ingredients = document.createElement('ul')
    const instructionsTitle = document.createElement('h3')
    const instructions = document.createElement('ol')

    recipeName.textContent = data.title
    favoriteButton.textContent = 'Favorite'
    cookTime.textContent = "Ready in " + data.readyInMinutes + " minutes."
    dietsTitle.textContent = "Diets:"
    recipeImage.src = data.image
    ingredientsTitle.textContent = "Ingredients:"
    instructionsTitle.textContent = "Instructions:"

    const storeFavorite = () => {
        let newFavorite = {
            name: data.title,
            image: data.image,
            recipeId: data.id,
            comments: '',
            readyTime: data.readyInMinutes,
            ingredients: JSON.stringify(data.extendedIngredients),
            instructions: JSON.stringify(data.analyzedInstructions),
            diets: JSON.stringify(data.diets)
        }
        postRecipes(newFavorite);
    }

    favoriteButton.addEventListener('click', storeFavorite);

    const createDietList = (data) => {
        const diet = document.createElement('li')
        diet.textContent = data
        diets.appendChild(diet)
    }

    _.map(data.diets, createDietList)

    const createIngredientsList = (data) => {
        const ingredient = document.createElement('li')
        ingredient.textContent = data.name
        ingredients.appendChild(ingredient)
    }

    _.map(data.extendedIngredients, createIngredientsList)

    const createInstructionsList = (data) => {
        const instruction = document.createElement('li')
        instruction.textContent = data.step
        instructions.appendChild(instruction)
    }

    _.map(data.analyzedInstructions[0].steps, createInstructionsList)

    recipesContainer.appendChild(recipeInfoEl)
    recipeInfoEl.appendChild(recipeName)
    recipeInfoEl.appendChild(favoriteButton)
    recipeInfoEl.appendChild(cookTime)
    recipeInfoEl.appendChild(dietsTitle)
    recipeInfoEl.appendChild(diets)
    recipeInfoEl.appendChild(recipeImage)
    recipeInfoEl.appendChild(ingredientsTitle)
    recipeInfoEl.appendChild(ingredients)
    recipeInfoEl.appendChild(instructionsTitle)
    recipeInfoEl.appendChild(instructions)
}

const postRecipes = async (recipeObj) => {
    const response = await fetch('/api/recipe', {
        method: 'POST',
        body: JSON.stringify(recipeObj),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()

    console.log(data)
}
