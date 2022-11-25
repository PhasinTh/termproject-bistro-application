import axios from 'axios'
axios.defaults.baseURL =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
export default axios
