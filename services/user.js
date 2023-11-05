//Import Axios
import axios from "axios";
// const axios = require('axios');

//Grab Backend Endpoint from Env Variables
const backend_url = "http://localhost:3000/api/users";



export async function postUser(user) {
  try {
    const response = await axios.post(backend_url, user, {
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data;
    console.log(data)
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

export async function getUser(email) {
  try {
    const response = await axios.get(`${backend_url}/${email}`, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
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

export async function getAllUsers() {
  console.log('in get all users')
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