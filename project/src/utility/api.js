import axios from 'axios';

// console.log(process.env.REACT_APP_BASE_URL)

const instance = axios.create(
    {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            //     "Accept-Version": "v1",
            //     "Authorization": process.env.REACT_APP_UNSPLASH_CLIENT_ID,
        }
    }
)


export default instance;
