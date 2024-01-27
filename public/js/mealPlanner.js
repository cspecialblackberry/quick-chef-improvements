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

const favoritesMessage = document.querySelector('#favorites-message')


let recipeAreaArray = [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
let selectArray = [sundaySelect, mondaySelect, tuesdaySelect, wednesdaySelect, thursdaySelect, fridaySelect, saturdaySelect]

let favorites

let clickedButton

let selectedRecipeName
let selectedRecipeId

let matchingRecipeArea
let matchingSelect

let storedRecipes = []
let storedRecipeAreas = []

//create an option for each favorited recipe in the database for the seven select fields
const createSelectOptions = async (select) => {
    const response = await fetch('/api/recipe');
    favorites = await response.json();
    function createOption(data) {
        let option = document.createElement('option')
        option.setAttribute('value', data.name)
        option.textContent = data.name
        select.appendChild(option)
    }
    if(favorites.name){
        favoritesMessage.textContent = "You don't have any favorites yet, please search for some recipes you like so you can add them to your weekly planner!"
    }else{
    _.map(favorites, createOption)
    }
}

_.map(selectArray, createSelectOptions)

//find the select field in the same section as the clicked button
const findMatchingSelect = (select) => {
    if (select.id.includes(clickedButton[0])) {
        return select
    }
}

//get the matching recipe object from the favorites array corresponding to the selected option
const findSelectedRecipeId = (data) => {
    if (data.name === selectedRecipeName) {
        return data
    }
}

//find the recipe area in the same section as the clicked button
const findMatchingRecipeArea = (recipeArea) => {
    if (recipeArea.id === clickedButton[0]) {
        return recipeArea
    }
}

//call the previous matching functions when the user hits submit and call the function to make the api call
const matchSelectedFields = (event) => {
    clickedButton = event.target.id.split('-')
    matchingSelect = _.find(selectArray, findMatchingSelect)
    selectedRecipeName = matchingSelect.value
    selectedRecipeId = _.find(favorites, findSelectedRecipeId)
    matchingRecipeArea = _.find(recipeAreaArray, findMatchingRecipeArea)

    displaySelectedRecipe(selectedRecipeId)
    storeSelectedRecipe(selectedRecipeId)
}

//store the selected recipe to local storage
const storeSelectedRecipe = (data) => {
    localStorage.setItem(matchingRecipeArea.id, JSON.stringify(data))
}

//clear the recipe area
const clearRecipeArea = () => {
    matchingRecipeArea.innerText = ""
}

//create various dom elements to display at-a-glance information about the selected recipe
const displaySelectedRecipe = (data) => {
    clearRecipeArea()

    const titleDiv = document.createElement('div')
    const ingredientsDiv = document.createElement('section')

    const recipeName = document.createElement('h2')
    const recipeImage = document.createElement('img')
    const recipeTime = document.createElement('h3')
    const recipeIngredients = document.createElement('ul')

    recipeName.textContent = data.name
    recipeImage.src = data.image
    recipeImage.style.maxWidth = '200px'
    recipeTime.textContent = "Ready in " + data.readyTime + " minutes"

    function createIngredients(ingredientObj) {
        const ingredient = document.createElement('li')
        ingredient.textContent = ingredientObj.name
        recipeIngredients.appendChild(ingredient)
    }

    _.map(JSON.parse(data.ingredients), createIngredients)

    titleDiv.appendChild(recipeName)
    titleDiv.appendChild(recipeImage)
    ingredientsDiv.appendChild(recipeTime)
    ingredientsDiv.appendChild(recipeIngredients)
    matchingRecipeArea.appendChild(titleDiv)
    matchingRecipeArea.appendChild(ingredientsDiv)
}

//looks for a stored recipe for each day of the week and pushes the results and corresponding recipe areas to their respective arrays
const lookForStoredRecipes = (day) => {
    if (localStorage.getItem(day.id)) {
        storedRecipeAreas.push(day)
        storedRecipes.push(JSON.parse(localStorage.getItem(day.id)))
    }
}

//iterates through the stored recipes and their recipe areas to display information again upon refresh
const displayStoredRecipes = (recipeArea, index) => {
    console.log(storedRecipes)
    console.log(storedRecipeAreas)
    const titleDiv = document.createElement('div')
    const ingredientsDiv = document.createElement('section')

    const recipeName = document.createElement('h2')
    const recipeImage = document.createElement('img')
    const recipeTime = document.createElement('h3')
    const recipeIngredients = document.createElement('ul')

    recipeName.textContent = storedRecipes[index].name
    recipeImage.src = storedRecipes[index].image
    recipeImage.style.maxWidth = '200px'
    recipeTime.textContent = "Ready in " + storedRecipes[index].readyTime + " minutes"

    function createIngredients(ingredientObj) {
        const ingredient = document.createElement('li')
        ingredient.textContent = ingredientObj.name
        recipeIngredients.appendChild(ingredient)
    }

    console.log(storedRecipes[index])
    _.map(JSON.parse(storedRecipes[index].ingredients), createIngredients)

    titleDiv.appendChild(recipeName)
    titleDiv.appendChild(recipeImage)
    ingredientsDiv.appendChild(recipeTime)
    ingredientsDiv.appendChild(recipeIngredients)
    recipeArea.appendChild(titleDiv)
    recipeArea.appendChild(ingredientsDiv)
}

//deletes the corresponding recipe from local storage and the page when the user clicks
const deleteStoredRecipe = (event) => {
    let day = event.target.id.split('-')
    localStorage.removeItem(day[0])

    function findRecipeArea(recipeArea) {
        if (recipeArea.id === day[0]) {
            return recipeArea
        }
    }

    matchingRecipeArea = _.find(recipeAreaArray, findRecipeArea)
    clearRecipeArea()
}

_.map(recipeAreaArray, lookForStoredRecipes)
_.map(storedRecipeAreas, displayStoredRecipes)


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
