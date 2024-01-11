const router = require('express').Router();
const { Trip } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allTrips = await Trip.findAll()

    res.status(200).json(allTrips);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTrip = await Trip.create({
      ...req.body
    });

    res.status(200).json(newTrip);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const tripData = await Trip.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tripData[0]) {
      res.status(404).json({ message: 'No trip with this id!' });
      return;
    }
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tripData = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tripData) {
      res.status(404).json({ message: 'No trip with this id!' });
      return;
    }
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
