const saturdaySelect = document.querySelector('#saturday-select')
const mondaySelect = document.querySelector('#monday-select')
const tuesdaySelect = document.querySelector('#tuesday-select')
const wednesdaySelect = document.querySelector('#wednesday-select')
const thursdaySelect = document.querySelector('#thursday-select')
const fridaySelect = document.querySelector('#friday-select')
const sundaySelect = document.querySelector('#sunday-select')

const sundayButton = document.querySelector('#sunday-button')
const mondayButton = document.querySelector('#monday-button')
const tuesdayButton = document.querySelector('#tuesday-button')
const wednesdayButton = document.querySelector('#wednesday-button')
const thursdayButton = document.querySelector('#thursday-button')
const fridayButton = document.querySelector('#friday-button')
const saturdayButton = document.querySelector('#saturday-button')

const sunday = document.querySelector('#sunday')
const monday = document.querySelector('#monday')
const tuesday = document.querySelector('#tuesday')
const wednesday = document.querySelector('#wednesday')
const thursday = document.querySelector('#thursday')
const friday = document.querySelector('#friday')
const saturday = document.querySelector('#saturday')

const sundayDelete = document.querySelector('#sunday-delete')
const mondayDelete = document.querySelector('#monday-delete')
const tuesdayDelete = document.querySelector('#tuesday-delete')
const wednesdayDelete = document.querySelector('#wednesday-delete')
const thursdayDelete = document.querySelector('#thursday-delete')
const fridayDelete = document.querySelector('#friday-delete')
const saturdayDelete = document.querySelector('#saturday-delete')

let recipeAreaArray = [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
let selectArray = [sundaySelect, mondaySelect, tuesdaySelect, wednesdaySelect, thursdaySelect, fridaySelect, saturdaySelect]



let clickedButton

let selectedRecipeName
let selectedRecipeId

let matchingRecipeArea
let matchingSelect

let storedRecipes = []
let storedRecipeAreas = []

const createSelectOptions = async (select) => {
    const response = await fetch('/api/recipe');
    favorites = await response.json();

    const createOption = (data) => {
        let option = document.createElement('option')
        option.setAttribute('value', data.name)
        option.textContent = data.name
        select.appendChild(option)
    }

    favorites.forEach(createOption)
}

selectArray.forEach(createSelectOptions)

const findMatchingSelect = (select) => {
    if (select.id.includes(clickedButton[0])) {
        return select
    }
}

const findSelectedRecipeId = (data) => {
    if (data.name === selectedRecipeName) {
        return data
    }
}

const findMatchingRecipeArea = (recipeArea) => {
    if (recipeArea.id === clickedButton[0]) {
        return recipeArea
    }
}

const getSelectedRecipe = async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${selectedRecipeId.recipeId}/information?apiKey=36808371f778457eb823b528e2d0a3a6`)
    const data = await response.json()
    displaySelectedRecipe(data)
    storeSelectedRecipe(data)
}

const getStoredRecipe = async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${selectedRecipeId}/information?apiKey=36808371f778457eb823b528e2d0a3a6`)
    const data = await response.json()
    displaySelectedRecipe(data)
}

const matchSelectedFields = (event) => {
    clickedButton = event.target.id.split('-')
    matchingSelect = selectArray.find(findMatchingSelect)
    selectedRecipeName = matchingSelect.value
    selectedRecipeId = favorites.find(findSelectedRecipeId)
    matchingRecipeArea = recipeAreaArray.find(findMatchingRecipeArea)

    getSelectedRecipe()
}

const storeSelectedRecipe = (data) => {
    localStorage.setItem(matchingRecipeArea.id, JSON.stringify(data))
}

const clearRecipeArea = () => {
    if (matchingRecipeArea.innerText) {
        matchingRecipeArea.innerText = ""
    }
}

const displaySelectedRecipe = (data) => {
    clearRecipeArea()

    const titleDiv = document.createElement('div')
    const ingredientsDiv = document.createElement('section')

    const recipeName = document.createElement('h2')
    const recipeImage = document.createElement('img')
    const recipeTime = document.createElement('h3')
    const recipeIngredients = document.createElement('ul')

    recipeName.textContent = data.title
    recipeImage.src = data.image
    recipeImage.style.maxWidth = '200px'
    recipeTime.textContent = "Ready in " + data.readyInMinutes + " minutes"

    const createIngredients = (ingredientObj) => {
        const ingredient = document.createElement('li')
        ingredient.textContent = ingredientObj.name
        recipeIngredients.appendChild(ingredient)
    }

    data.extendedIngredients.forEach(createIngredients)

    titleDiv.appendChild(recipeName)
    titleDiv.appendChild(recipeImage)
    ingredientsDiv.appendChild(recipeTime)
    ingredientsDiv.appendChild(recipeIngredients)
    matchingRecipeArea.appendChild(titleDiv)
    matchingRecipeArea.appendChild(ingredientsDiv)
}

const lookForStoredRecipes = (day) => {
    if (localStorage.getItem(day.id)) {
        storedRecipeAreas.push(day)
        storedRecipes.push(JSON.parse(localStorage.getItem(day.id)))
    }
}

const displayStoredRecipes = (recipeArea, index) => {
    const titleDiv = document.createElement('div')
    const ingredientsDiv = document.createElement('section')

    const recipeName = document.createElement('h2')
    const recipeImage = document.createElement('img')
    const recipeTime = document.createElement('h3')
    const recipeIngredients = document.createElement('ul')

    recipeName.textContent = storedRecipes[index].title
    recipeImage.src = storedRecipes[index].image
    recipeImage.style.maxWidth = '200px'
    recipeTime.textContent = "Ready in " + storedRecipes[index].readyInMinutes + " minutes"

    const createIngredients = (ingredientObj) => {
        const ingredient = document.createElement('li')
        ingredient.textContent = ingredientObj.name
        recipeIngredients.appendChild(ingredient)
    }

    storedRecipes[index].extendedIngredients.forEach(createIngredients)

    titleDiv.appendChild(recipeName)
    titleDiv.appendChild(recipeImage)
    ingredientsDiv.appendChild(recipeTime)
    ingredientsDiv.appendChild(recipeIngredients)
    recipeArea.appendChild(titleDiv)
    recipeArea.appendChild(ingredientsDiv)
} 

const deleteStoredRecipe = (event) => {
    let day = event.target.id.split('-')
    localStorage.removeItem(day[0])

    function findRecipeArea(recipeArea) {
        if (recipeArea.id === clickedButton[0]) {
            return recipeArea
        }
    }

    matchingRecipeArea = recipeAreaArray.find(findRecipeArea)
    clearRecipeArea(matchingRecipeArea)
}

recipeAreaArray.forEach(lookForStoredRecipes)
storedRecipeAreas.forEach(displayStoredRecipes)


console.log(storedRecipeAreas)
console.log(storedRecipes)


sundayButton.addEventListener('click', matchSelectedFields)
mondayButton.addEventListener('click', matchSelectedFields)
tuesdayButton.addEventListener('click', matchSelectedFields)
wednesdayButton.addEventListener('click', matchSelectedFields)
thursdayButton.addEventListener('click', matchSelectedFields)
fridayButton.addEventListener('click', matchSelectedFields)
saturdayButton.addEventListener('click', matchSelectedFields)

sundayDelete.addEventListener('click', deleteStoredRecipe)
mondayDelete.addEventListener('click', deleteStoredRecipe)
tuesdayDelete.addEventListener('click', deleteStoredRecipe)
wednesdayDelete.addEventListener('click', deleteStoredRecipe)
thursdayDelete.addEventListener('click', deleteStoredRecipe)
fridayDelete.addEventListener('click', deleteStoredRecipe)
saturdayDelete.addEventListener('click', deleteStoredRecipe)