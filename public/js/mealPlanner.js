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


let recipeAreaArray = [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
let selectArray = [sundaySelect, mondaySelect, tuesdaySelect, wednesdaySelect, thursdaySelect, fridaySelect, saturdaySelect]

console.log(recipeAreaArray)

let dataBase

const createSelectFields = async (select) => {
    const response = await fetch('/api/recipe');
    dataBase = await response.json();
    
    const createOption = (data) => {
        let option = document.createElement('option')
        option.setAttribute('value', data.name)
        option.textContent = data.name
        select.appendChild(option)
    }

    dataBase.forEach(createOption)
}

selectArray.forEach(createSelectFields)

let clickedButton
let selectedRecipeName
let selectedRecipeId

const findMatchingSelect = (select) => {
    if(select.id.includes(clickedButton[0])){
        return select
    }
}

const findSelectedRecipeId = (data) => {
    if(data.name===selectedRecipeName){
        return data
    }
}

const findMatchingRecipeArea = (recipeArea) => {
    if(recipeArea.id===clickedButton[0]){
        return recipeArea
    }
}

const getSelectedRecipe = async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${selectedRecipeId.recipeId}/information?apiKey=36808371f778457eb823b528e2d0a3a6`)
    const data = await response.json()
    return data
}

const displaySelectedRecipe = async (event) => {
    clickedButton = event.target.id.split('-')
    let matchingSelect = selectArray.find(findMatchingSelect)
    selectedRecipeName = matchingSelect.value 
    selectedRecipeId = dataBase.find(findSelectedRecipeId)
    let matchingRecipeArea = recipeAreaArray.find(findMatchingRecipeArea)
    
    data = await getSelectedRecipe()
    console.log(data)

    const titleDiv = document.createElement('div')
    const ingredientsDiv = document.createElement('section')
   

    const recipeName = document.createElement('h2')
    const recipeImage = document.createElement('img')
    const recipeTime = document.createElement('h3')
    const recipeIngredients = document.createElement('ul')

    recipeName.textContent = data.title
    recipeImage.src = data.image 
    recipeImage.style.width = '25px'
    recipeTime.textContent = "Ready in " + data.readyInMinutes + " minutes."

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

sundayButton.addEventListener('click', displaySelectedRecipe)
mondayButton.addEventListener('click', displaySelectedRecipe)
tuesdayButton.addEventListener('click', displaySelectedRecipe)
wednesdayButton.addEventListener('click', displaySelectedRecipe)
thursdayButton.addEventListener('click', displaySelectedRecipe)
fridayButton.addEventListener('click', displaySelectedRecipe)
saturdayButton.addEventListener('click', displaySelectedRecipe)