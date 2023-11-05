import axios from "axios";
const backend_url = "http://localhost:3000/api/profiles";

export async function updateProfilePreferences(profileId, preferences) {
    try {
        const response = await axios.put(`${backend_url}/${profileId}`, preferences, {
            headers: { "Content-Type": "application/json" },
        });
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

export async function getAllProfiles() {
  try {
    const response = await axios.get(`${backend_url}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addFriend(userId, friendId) {
  try {
    const response = await axios.post(`${backend_url}/${userId}/friends/${friendId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}