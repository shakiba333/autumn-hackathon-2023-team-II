const Meal = require("../models/meal");

model.exports = {
  createMeal,
  index,
  showMeal,
  deleteMeal,
};

async function createMeal(req, res) {
  try {
    const meal = await Meal.create(req.body);
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function index(req, res) {
  try {
    const meals = await Meal.find();

    res.status(200).json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
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
