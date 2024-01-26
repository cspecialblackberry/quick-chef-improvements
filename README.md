# Quick Chef App

## Description

Quick Chef was created so that the user can find recipes to fit their time constraints, ingredient choices, and food intolerances. We used the Spoonacular API to retrieve recipe data using a get request. The user can find recipes that match their criteria and 'favorite' the ones they want to come back to. Using a post request, we store favorite recipes to the database and display them on the My Favorites page. We also learned how to use put requests, allowing users to update their favorite recipes with unique comments for each.

We created a Meal Planner page where users can select daily recipes from their favorites for the week. When selected, the chosen recipes are stored locally so that the user can view them each time they visit the website.

A new technology we worked with for this website was Lodash. We used the _.map() method to iterate through arrays, and the _.find() method to get a matching object from an array.

In our CSS, we utilized flexbox and media queries to create a clean and responsive design.

![Quick Chef App]()
[Deployed Website]()

## Usage

On the home page, the user can select a specific ingredient to include, a timeframe they'd like to stay within, and any intolerances they might have. When they click find recipes, they'll be presented with recipe results matching their desired criteria. When the user clicks on a given recipe, they'll see more details about that specific recipe, such as the cook time, ingredients, instructions, and the diets the recipe will fit in. The user can add the recipe to their Favorites by clicking the favorite button.

When the user goes to the My Favorites page, they'll be presented with every recipe they've added to their favorites. On the Meal Planner page, the user can select one recipe from their list of favorites for each day of the week. These recipes are stored locally so the user can retrieve them when they return to the page.

## Credits

The collaborators on this website are [Charles Hall](https://github.com/cspecialblackberry) and [Casey Newman](https://github.com/caseynewman).

## License

The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

---

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Features

If your project has a lot of features, list them here.