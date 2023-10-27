//Import Axios
import axios from "axios";
// const axios = require('axios');

//Grab Backend Endpoint from Env Variables
const backend_url = "http://localhost:3000/api/meals";

export async function postMeal(meal) {
  try {
    const response = await axios.post(backend_url, meal, {
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data;
    return data;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error("Server responded with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else {
      console.error(error);
    }
    return null;
  }
}

export async function deleteMealByEdamamId(edamamId) {
  try {
    const response = await axios.delete(`${backend_url}/edamam/${edamamId}`, {
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data;
    return data;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error("Server responded with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else {
      console.error(error);
    }
    return null;
  }
}

export async function findMealByEdamamId(edamamId) {
  try {
    const response = await axios.get(`${backend_url}/edamam/${edamamId}`, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error("Server responded with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else {
      console.error(error);
    }
    return null;
  }
}
