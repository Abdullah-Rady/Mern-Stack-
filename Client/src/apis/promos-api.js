import axios from 'axios'

const baseUrl = 'http://localhost:8000/'

export const createPromoCode = async (promo, credentials) => {

    try {
        let res = await axios.request({
            method: 'POST',
            url: baseUrl + "api/promo",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
            },
            data: JSON.stringify(promo)
            
        })
        return res
        
    } catch (error) {
        throw new Error(error)
    }
}



export const usePromo = async (promo) => {

    try {
        let res = await axios.request({
            method: 'POST',
            url: baseUrl + "api/usepromo",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(promo)
            
        })
        return res
        
    } catch (error) {
        throw new Error(error)
    }
}