import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`

}

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data

}

const update = async (id, newObj) => {
  // Don't we need to provide the token here?
  const response = await axios.put(`${baseUrl}/${id}`, newObj)
  return response.data


}

export default { getAll, setToken, create, update }