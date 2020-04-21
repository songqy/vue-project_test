import axios from 'axios'

const request = {}

request.get = async (url) => {
  const res = await axios({
    method: 'GET',
    url
  })

  return res.data
}

request.post = async (url, data) => {
  const res = await axios({
    method: 'POST',
    url,
    data
  })

  return res.data
}

export default request
