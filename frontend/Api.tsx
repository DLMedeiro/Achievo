import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

class Api {
  // Helper function for each request
  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method)

    const url = `${BASE_URL}/${endpoint}`
    const params = method === 'get' ? data : {}
    try {
      return (await axios({ url, method, data, params })).data
    } catch (err) {
      console.error('API Error:', err.response)
      let message = err.response.data.error.message
      throw Array.isArray(message) ? message : [message]
    }
  }

  static async loginUser(loginData) {
    let res = await this.request('login', loginData, 'post')
  }

  // Login user: Takes in e-mail and password from login form
  // Axios.post('http://localhost:3001/login', values).then((response) => {
  //     if (response.data.message) {
  //     setLoginStatus(false)
  //     // setLoginStatus(response.data.message)
  //     } else {
  //     setLoginStatus(true)
  //     // setLoginStatus(response.data[0])
  //     }
  // })
  // }
}

export default Api
