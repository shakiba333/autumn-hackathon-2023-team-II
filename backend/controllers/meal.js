const Meal = require("../models/meal");

module.exports = {
  createMeal,
  index,
  showMeal,
  showMealByEdamamId,
  deleteMeal,
  deleteMealByEdamamId,
};

async function createMeal(req, res) {
  try {
    const meal = await Meal.create(req.body);
    res.status(201).json(meal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating meal" });
  }
}

async function index(req, res) {
  try {
    const meals = await Meal.find();

    res.status(200).json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching meal list" });
  }
}

async function showMeal(req, res) {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.status(200).json(meal);
  } catch (error) {
    console.error("Error fetching meal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function showMealByEdamamId(req, res) {
  try {
    const meal = await Meal.findOne({ api_id: req.params.id });
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.status(200).json(meal);
  } catch (error) {
    console.error("Error fetching meal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteMeal(req, res) {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteMealByEdamamId(req, res) {
  try {
    const mealByEdamamId = await Meal.findOne({ api_id: req.params.id });
    const meal = await Meal.findByIdAndDelete(mealByEdamamId._id);
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
