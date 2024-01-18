const saturdaySelect = document.querySelector('#saturday-select')
const mondaySelect = document.querySelector('#monday-select')
const tuesdaySelect = document.querySelector('#tuesday-select')
const wednesdaySelect = document.querySelector('#wednesday-select')
const thursdaySelect = document.querySelector('#thursday-select')
const fridaySelect = document.querySelector('#friday-select')
const sundaySelect = document.querySelector('#sunday-select')

let selectArray = [sundaySelect, mondaySelect, tuesdaySelect, wednesdaySelect, thursdaySelect, fridaySelect, saturdaySelect]

const getFavoriteRecipes = async () => {
    const response = await fetch('/api/recipe');
    const favRecipesData = await response.json();
    console.log(favRecipesData)
}

// getFavoriteRecipes()

const createSelectFields = async (select) => {
    const response = await fetch('/api/recipe');
    const data = await response.json();
    
    const createOption = (data) => {
        let option = document.createElement('option')
        option.setAttribute('value', data.name)
        option.textContent = data.name
        select.appendChild(option)
    }

    data.forEach(createOption)
}

selectArray.forEach(createSelectFields)