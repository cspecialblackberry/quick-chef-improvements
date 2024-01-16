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
  try {
    const newRecipe = await Recipe.create({
      ...req.body
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const recipeData = await Trip.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!recipeData[0]) {
      res.status(404).json({ message: 'No trip with this id!' });
      return;
    }
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const recipeData = await Trip.destroy({
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
