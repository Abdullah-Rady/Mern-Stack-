
import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/individual'

export const createUser = async (trainee) => {

    let res;
    try {
        res = await axios.request({
            method: 'POST',
            url: baseUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(trainee)
            
        })
        
        return res;
        
    } catch (error) {
        throw new Error(error);
    }
    
}


export const enrollCourse = async (data) => {

    let res;
    try {
        res = await axios.request({
            method: 'POST',
            url: baseUrl + '/enroll',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
            
        })
        
        return res;
        
    } catch (error) {
        throw new Error(error);
    }
    
}



export const getIndividualCourses = async (id) => {

    let res;
    try {
        res = await axios.request({
            method: 'GET',
            url: baseUrl + `/${id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },            
        })
        
        return res;
        
    } catch (error) {
        throw new Error(error);
    }
    
}