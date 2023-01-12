import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/courses'

export const ByFilter = async (filter) => {

    try{
        let res = await axios.request({
            method: 'GET',
            url: baseUrl + '/ByFilter',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
               
            },
            data: JSON.stringify(filter)
        })

        return res
    }catch(err){
        throw err;
    }
        
}
export const ByPrice = async (filter) => {
    try{
        let res = await axios.request({
            method: 'POST',
            url: baseUrl + '/ByPrice',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
               
            },
            data: JSON.stringify(filter)
        })

        return res
    }catch(err){
        throw err;
    }
        
}



export const ByInstructorId = async (id) => {

    try{
        let res = await axios.request({
            method: 'GET',
            url: baseUrl + '/ByInstructorId',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
               
            },
            data: JSON.stringify(id)
        })

        return res
    }catch(err){
        throw err;
    }
        
}


