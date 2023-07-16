// This file is for making http requests and sending the data back, and setting any data in local storage
import axios from 'axios'

const DATA_URL = process.env.REACT_APP_URL_DATA
// const DATA_URL = 'http://localhost:5000'

// Get users
const getUsers = async () => {

    if (DATA_URL) {
      const response = await axios.get(
        DATA_URL)
      return response.data
    }
  }

  const dataService = {
    getUsers,

  }
  export default dataService;