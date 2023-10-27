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