const favoritesContainer = document.querySelector('#favorites-container');
let favRecipesData = [];
let recipeID;

const getFavoriteRecipes = async () => {
    const response = await fetch('/api/recipe');
    favRecipesData = await response.json();
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
        // clearResultArea()
        // displaySpecificRecipe(recipe)
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
    // const backButton = document.createElement('button')
    // backButton.textContent = 'back'
    // backButton.addEventListener('click', getRecipes)
    // backButton.addEventListener('click', clearPageButtonArea)
    // pageButtonContainer.appendChild(backButton)

    const recipeInfoEl = document.createElement('article')
    const recipeName = document.createElement('h2')
    // const favoriteButton = document.createElement('button')
    const cookTime = document.createElement('p')
    const dietsTitle = document.createElement('h3')
    const diets = document.createElement('ul')
    const recipeImage = document.createElement('img')
    const ingredientsTitle = document.createElement('h3')
    const ingredients = document.createElement('ul')
    const instructionsTitle = document.createElement('h3')
    const instructions = document.createElement('ol')

    recipeName.textContent = data.title
    // favoriteButton.textContent = 'Favorite'
    cookTime.textContent = "Ready in " + data.readyInMinutes + " minutes."
    dietsTitle.textContent = "Diets:"
    recipeImage.src = data.image
    ingredientsTitle.textContent = "Ingredients:"
    instructionsTitle.textContent = "Instructions:"

    // const storeFavorite = () => {
    //     let newFavorite = {
    //         name: data.title,
    //         image: data.image,
    //         recipeId: data.id,
    //         comments: '',
    //         readyTime: data.readyInMinutes,
    //         ingredients: JSON.stringify(data.extendedIngredients),
    //         instructions: JSON.stringify(data.analyzedInstructions)
    //     }
    //     postRecipes(newFavorite);
    // }

    // favoriteButton.addEventListener('click', storeFavorite);

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

    favoritesContainer.appendChild(recipeInfoEl)
    recipeInfoEl.appendChild(recipeName)
    // recipeInfoEl.appendChild(favoriteButton)
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

    if (event.key === 'Enter') {
        let comments = commentEl.textContent;
        if (comments.length > 0)  {
            recipeData.comments = commentEl.textContent;
            comments = recipeData.comments + ', ' + commentInput.value;
        }
        let newComment = {
            comments: comments
        };
        updateRecipe(recipeData.id, newComment, commentEl);
    }
}

const displayComments = (commentEl, object) => {
    commentEl.textContent = object.comments;
}

const updateRecipe = async (id, newRecipeObj, comments) => {
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