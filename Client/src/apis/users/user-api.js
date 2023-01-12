import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/users'

export const getUser = async (id) => {

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
    }catch(err){
        throw new Error(err);
    }
        
}

export const finishCourse = async (id) => {

    try{
        let res = await axios.request({
            method: 'GET',
            url: baseUrl + `/finish/${id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        return res
    }catch(err){
        throw new Error(err);
    }
        
}