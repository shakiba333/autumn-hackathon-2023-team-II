import axios from "axios";
const backend_url = "http://localhost:3000/api/groups";

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
