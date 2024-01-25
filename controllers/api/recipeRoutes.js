const router = require('express').Router();
const { Recipe } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allRecipes = await Recipe.findAll()

    res.status(200).json(allRecipes);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const newRecipe = await Recipe.create({
      ...req.body
    });
console.log(newRecipe.toJSON)
    res.status(200).json(newRecipe);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!recipeData[0]) {
      res.status(404).json({ message: 'No recipe with this id!' });
      return;
    }
    console.log(recipeData)
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!recipeData) {
      res.status(404).json({ message: 'No recipe with this id!' });
      return;
    }
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
