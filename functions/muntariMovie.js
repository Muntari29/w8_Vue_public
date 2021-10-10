require('dotenv').config()
const axios = require('axios')
const { API_END_POINT, API_KEY } = process.env 

exports.handler = async function (event) {
    const options = JSON.parse(event.body)
    const { movieId, title, page=1, body, method } =options
    
    if (title && !movieId){
        console.log('title!!!')
        const { data } = await axios({
            url: `${API_END_POINT}?apikey=${API_KEY}&s=${title}&page=${page}`,
            method,
            data: body
        })
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    }
    if (!title && movieId){
        console.log('movie!!!!')
        const { data } = await axios({
            url: `${API_END_POINT}?apikey=${API_KEY}&i=${movieId}&plot=full`,
            method,
            data: body
        })
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    }    
}
