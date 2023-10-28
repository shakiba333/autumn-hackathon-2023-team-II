import axios from "axios";
const backend_url = "http://localhost:3000/api/groups";

export async function getUserFavorites(groupId) {
  try {
    const response = await axios.get(
      `${backend_url}/favorites/${groupId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
      console.error(error);

    return null;
  }

}

export async function updateGroupMeals(groupId, mealId) {
  try {
    const response = await axios.put(
      `${backend_url}/meal/${groupId}/${mealId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else {
      console.error(error);
    }

    return null;
  }
}

