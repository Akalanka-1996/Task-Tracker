import axios from "axios";

const API_URL = 'http://localhost:5001/api/auth/'

// Login user

const login = async (userData) => {
    console.log("service")
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    login
}

export default authService