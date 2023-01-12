import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/instructor'

export const createInstructor = async (instructor, credentials) => {
    await axios.request({
        method: 'POST',
        url: baseUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials
        },
        data: JSON.stringify(instructor)
        
})}

export const getInstructor = async (id) => {
    try{
    let res = await axios.request({
        method: 'GET',
        url: baseUrl + `/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        return res
    }catch(error){
        throw new Error(error)
    }
}

export const addRating = async (id, rate) => {
    console.log(rate)
    try{
        let res = await axios.request({
            method: 'POST',
            url: baseUrl + `/${id}/rate`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(rate)
        })
        return res
    }catch(error){
        throw new Error(error)
    }
}


export const checkAdmin = async (credentials) => {

    try{
        let res = await axios.request({
            method: 'GET',
            url: baseUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
            }
        })

        return res
    }catch(err){
        throw new Error(err);
    }
        
}
