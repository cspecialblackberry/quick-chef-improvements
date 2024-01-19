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


let selectArray = [sundaySelect, mondaySelect, tuesdaySelect, wednesdaySelect, thursdaySelect, fridaySelect, saturdaySelect]

let data

const createSelectFields = async (select) => {
    const response = await fetch('/api/recipe');
    data = await response.json();
    
    const createOption = (data) => {
        let option = document.createElement('option')
        option.setAttribute('value', data.name)
        option.textContent = data.name
        console.log(option)
        select.appendChild(option)
    }

    data.forEach(createOption)
}

selectArray.forEach(createSelectFields)

let clickedButton
let selectedRecipeName

const findMatchingSelect = (select) => {
    if(select.id.includes(clickedButton[0])){
        return select
    }
}

const findSelectedRecipeId = (data) => {
    if(data.name===selectedRecipeName){
        return data.recipeId
    }
}

const displaySelectedRecipe = (event) => {
    clickedButton = event.target.id.split('-')
    let matchingSelect = selectArray.find(findMatchingSelect)
    selectedRecipeName = matchingSelect.value 
    console.log(selectedRecipeName)
    selectedRecipeId = data.find(findSelectedRecipeId)
}

sundayButton.addEventListener('click', displaySelectedRecipe)
mondayButton.addEventListener('click', displaySelectedRecipe)
tuesdayButton.addEventListener('click', displaySelectedRecipe)
wednesdayButton.addEventListener('click', displaySelectedRecipe)
thursdayButton.addEventListener('click', displaySelectedRecipe)
fridayButton.addEventListener('click', displaySelectedRecipe)
saturdayButton.addEventListener('click', displaySelectedRecipe)