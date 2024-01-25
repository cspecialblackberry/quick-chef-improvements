const favoritesContainer = document.querySelector('#favorites-container');
const pageButtonContainer = document.querySelector('#page-button-container');
let favRecipesData = [];
let recipeID;

const getFavoriteRecipes = async () => {
    const response = await fetch('/api/recipe');
    favRecipesData = await response.json();
    console.log(favRecipesData)
    clearResultArea();

    for (let i = 0; i < favRecipesData.length; i++) {
        displayFavRecipe(favRecipesData[i]);
    }
}

getFavoriteRecipes();

const getSpecificRecipe = async (recipe) => {
    console.log('hi')
    if(recipe.recipeID === recipeID) {
        return recipe
    }
}

const displayFavRecipe = (recipeData) => {
    const favRecipeEl = document.createElement('article');
    const favRecipeName = document.createElement('h2');
    const favRecipeImage = document.createElement('img');
    const commentInput = document.createElement('input');
    const commentsLabel = document.createElement('label');
    const commentEl = document.createElement('p');

    favRecipeName.innerHTML = `<button>${recipeData.name}</button>`;
    favRecipeName.setAttribute('class', 'recipe-name');
    favRecipeName.querySelector('button').setAttribute('data-recipe-id', recipeData.recipeId);
    favRecipeName.querySelector('button').addEventListener('click', function (event) {
        recipeID = event.target.getAttribute('data-recipe-id');
        const specificRecipe = favRecipesData.find(getSpecificRecipe);
        displaySpecificRecipe(specificRecipe);
    });
    favRecipeImage.src = recipeData.image;
    commentInput.setAttribute('class', 'fav-comments');
    commentInput.setAttribute('placeholder', 'Jot down your notes!');
    commentsLabel.setAttribute('for', 'fav-comments');
    commentsLabel.textContent = 'Share your thoughts or changes to the recipe:';
    commentEl.setAttribute('class', 'comments');

    favoritesContainer.appendChild(favRecipeEl);
    favRecipeEl.appendChild(favRecipeName);
    favRecipeEl.appendChild(favRecipeImage);
    favRecipeEl.appendChild(commentsLabel);
    favRecipeEl.appendChild(commentInput);
    favRecipeEl.appendChild(commentEl)
    displayComments(commentEl, recipeData);

    commentInput.addEventListener('keyup', function(event) {
        updateComments(event, recipeData, commentInput);
    });
}

const displaySpecificRecipe = (data) => {
    clearResultArea();

    const backButton = document.createElement('button')
    backButton.textContent = 'back'
    backButton.addEventListener('click', getFavoriteRecipes)
    pageButtonContainer.appendChild(backButton)

    const recipeInfoEl = document.createElement('article')
    const recipeName = document.createElement('h2')
    
    const cookTime = document.createElement('p')
    const dietsTitle = document.createElement('h3')
    const diets = document.createElement('ul')
    const recipeImage = document.createElement('img')
    const ingredientsTitle = document.createElement('h3')
    const ingredients = document.createElement('ul')
    const instructionsTitle = document.createElement('h3')
    const instructions = document.createElement('ol')

    recipeName.textContent = data.title
  
    cookTime.textContent = "Ready in " + data.readyTime + " minutes."
    dietsTitle.textContent = "Diets:"
    recipeImage.src = data.image
    ingredientsTitle.textContent = "Ingredients:"
    instructionsTitle.textContent = "Instructions:"


    console.log(data)

    const createDietList = (data) => {
        const diet = document.createElement('li')
        diet.textContent = data
        diets.appendChild(diet)
    }

    JSON.parse(data.diets).forEach(createDietList)

    const createIngredientsList = (data) => {
        const ingredient = document.createElement('li')
        ingredient.textContent = data.name
        ingredients.appendChild(ingredient)
    }

    JSON.parse(data.ingredients).forEach(createIngredientsList)

    const createInstructionsList = (data) => {
        const instruction = document.createElement('li')
        instruction.textContent = data.step
        instructions.appendChild(instruction)
    }
    
    JSON.parse(data.instructions)[0].steps.forEach(createInstructionsList)

    favoritesContainer.appendChild(recipeInfoEl)
    recipeInfoEl.appendChild(recipeName)
    recipeInfoEl.appendChild(cookTime)
    recipeInfoEl.appendChild(dietsTitle)
    recipeInfoEl.appendChild(diets)
    recipeInfoEl.appendChild(recipeImage)
    recipeInfoEl.appendChild(ingredientsTitle)
    recipeInfoEl.appendChild(ingredients)
    recipeInfoEl.appendChild(instructionsTitle)
    recipeInfoEl.appendChild(instructions)
}

const updateComments = (event, recipeData, commentInput) => {
    let recipeEl = commentInput.parentElement;
    let commentEl = recipeEl.querySelector('.comments');
    console.log(recipeData)
    if (event.key === 'Enter') {
        let comments = commentEl.textContent;
        if (comments.length > 0)  {
            recipeData.comments = commentEl.textContent;
            comments = recipeData.comments + ', ' + commentInput.value;
        }
        let newComment = {
            comments: ''
        };
        updateRecipe(recipeData.id, newComment, commentEl);
    }
}

const displayComments = (commentEl, object) => {
    commentEl.textContent = object.comments;
}

const updateRecipe = async (id, newRecipeObj, comments) => {
    console.log(id)
    const response = await fetch(`/api/recipe/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newRecipeObj),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json()
    console.log(data)
    displayComments(comments, newRecipeObj);
}

const clearResultArea = () => {
    favoritesContainer.textContent = '';
}