import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://173.249.37.183:8080/api'
})
