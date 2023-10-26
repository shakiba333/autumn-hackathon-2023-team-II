// Import Axios
const axios = require('axios').default;

//Grab Backend Endpoint from Env Variables
const backend_url = 'http://localhost:3000/api/users'

//Provide Test API Query Parameters
const testPostData = {
    user: {
        "googleId": "",
        "name": "",
        "email": "",
        "avatar": ""
    }
}


export default async function postPreferences(postData = testPostData) {

    try {

        const response = await axios.post(backend_url, postData)

        const data = response.data
        return (data)

    } catch (error) {

        if (error.response) {
            // The request was made, but the server responded with an error status code
            console.error('Server responded with status:', error.response.status);
            console.error('Response data:', error.response.data);
        } else {
            console.error(error)
        }

        return null

    }
}