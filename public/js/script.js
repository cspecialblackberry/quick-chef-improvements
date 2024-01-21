const searchBtn = document.querySelector('#recipe-search');
const ingredientsInput = document.querySelector('#ingredients')
const timeSlider = document.querySelector('#time-slider')
const intolerancesCheckBox = document.querySelector('#intolerances')
const recipesContainer = document.querySelector('#recipes-container');
const myFavorites = document.querySelector('#favorites');
const searchContainer = document.querySelector('#search-container');

// let recipeID = 715415
let recipeID;

let userSelections = {
    query: [],
    intolerances: [],
    maxReadyTime: 0
}

const setUserSelections = (event) => {
    userSelections.query = ingredientsInput.value.split(' ')
    userSelections.maxReadyTime = timeSlider.value
    userSelections.intolerances = intolerancesCheckBox.value.split(' ')
    ingredientsInput.value = ''
    timeSlider.value = 30
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
    console.log(data)
    clearResultArea()
    data.results.forEach(displayRecipes)
}

const joinFilters = (queryFilters) => {
    let newQueryFilters = queryFilters.slice(0, -1)
    baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=36808371f778457eb823b528e2d0a3a6&instructionsRequired=true`
    baseURL += newQueryFilters
    console.log(baseURL)
    getRecipes(baseURL)
}

const createQueryFilters = (selection) => {

    let queryFilters = `&`

    for (key in selection) {
        if (key === 'query' && selection[key] != '') {
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
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=36808371f778457eb823b528e2d0a3a6`)
    const data = await response.json()
    console.log(data)
    clearResultArea()
    displaySpecificRecipe(data)
}

const clearResultArea = () => {
    recipesContainer.textContent = '';
}

const clearSearchArea = () => {
    searchContainer.textContent = '';
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
    
    const recipeInfoEl = document.createElement('article')
    const recipeName = document.createElement('h2')
    const favoriteButton = document.createElement('button')
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
            comments: ''
        }
        postRecipes(newFavorite);
    }

    favoriteButton.addEventListener('click', storeFavorite);

    const createDietList = (data) => {
        const diet = document.createElement('li')
        diet.textContent = data
        diets.appendChild(diet)
    }

    data.diets.forEach(createDietList)

    const createIngredientsList = (data) => {
        const ingredient = document.createElement('li')
        ingredient.textContent = data.name
        ingredients.appendChild(ingredient)
    }

    data.extendedIngredients.forEach(createIngredientsList)

    const createInstructionsList = (data) => {
        const instruction = document.createElement('li')
        instruction.textContent = data.step
        instructions.appendChild(instruction)
    }

    data.analyzedInstructions[0].steps.forEach(createInstructionsList)

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

const postRecipes = async(recipeObj) => {
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

const getFavoriteRecipes = async () => {
    clearResultArea();
    clearSearchArea();
    const response = await fetch('/api/recipe');
    const favRecipesData = await response.json();
    console.log(favRecipesData)

    for(let i = 0; i < favRecipesData.length; i++) {
        displayFavRecipe(favRecipesData[i]);
    }
}

const displayFavRecipe = (recipeData) => {
    const favRecipeEl = document.createElement('article');
    const favRecipeName = document.createElement('h2');
    const favRecipeImage = document.createElement('img');
    const commentInput = document.createElement('input');
    const commentsLabel = document.createElement('label');
    const savedComment = document.createElement('p');
    let newComment = {
        comments: commentInput.value
    };

    favRecipeName.innerHTML = `<button>${recipeData.name}</button>`;
    favRecipeName.setAttribute('class', 'recipe-name');
    favRecipeName.querySelector('button').setAttribute('data-recipe-id', recipeData.recipeId);
    favRecipeName.querySelector('button').addEventListener('click', function(event) {
        recipeID = event.target.getAttribute('data-recipe-id');
        getSpecificRecipe(recipeID);
    });
    favRecipeImage.src = recipeData.image;
    commentInput.setAttribute('class', 'fav-comments');
    commentInput.setAttribute('placeholder', 'Jot down your notes!');
    commentsLabel.setAttribute('for', 'fav-comments');
    commentsLabel.textContent = 'Share your thoughts or changes to the recipe:';
    savedComment.textContent = newComment.comments;

    recipesContainer.appendChild(favRecipeEl);
    favRecipeEl.appendChild(favRecipeName);
    favRecipeEl.appendChild(favRecipeImage);
    favRecipeEl.appendChild(commentsLabel);
    favRecipeEl.appendChild(commentInput);
    favRecipeEl.appendChild(savedComment);

    const updateComments = (event) => {
        if (event.key === 'Enter') {
            updateRecipe(recipeData.id, newComment);
        }
    }

    commentInput.addEventListener('keyup', updateComments);
}

myFavorites.addEventListener('click', getFavoriteRecipes);

const updateRecipe = async(id, newRecipeObj) => {
    const response = await fetch(`/api/recipe/${id}`, {
         method: 'PUT',
         body: JSON.stringify(newRecipeObj),
         headers: {
             'Content-Type': 'application/json',
         }
     })
     const data = await response.json()
     console.log(data)
}





// const newRecipe = {
//     name: 'pretty cool mountain adventure',
//     description: 'more than okay!!!'
// }

// postRecipes(newRecipe)



/**
 * Uncomment the below code to DELETE data from the database
 */


// const deleteTrips = async(id) => {
//    const response = await fetch(`/api/trips/{id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     const data = await response.json()
//     console.log(data)
// }

// deleteTrip(1)


/**
 * Uncomment the below code to Update data in the database
 */

// const newTrip = {
//     name: 'pretty cool mountain adventure',
//     description: 'WAY WAY more than okay!!!'
// }
