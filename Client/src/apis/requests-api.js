import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/requests'

export const getAllRequests = async (promo) => {

    try {
        let res = await axios.request({
            method: 'GET',
            url: baseUrl ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },            
        })
        return res
        
    } catch (error) {
        throw new Error(error)
    }
}