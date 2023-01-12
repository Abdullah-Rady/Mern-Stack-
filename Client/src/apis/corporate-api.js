import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/corporates'

export const createCorporate = async (admin, credentials) => {

    try{
        let res = await axios.request({
            method: 'POST',
            url: baseUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
            },
            data: JSON.stringify(admin)
        })

        return res
    }catch(err){
        throw new Error(err);
    }
        
}

export const requestAccess = async (data) => {

    try{
        let res = await axios.request({
            method: 'POST',
            url: baseUrl + "/request",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        })

        return res
    }catch(err){
        throw new Error(err);
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

export const reject = async (data) => {

    let res;
    try {
        res = await axios.request({
            method: 'POST',
            url: baseUrl + '/reject',
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


export const getCorporateCourses = async (id) => {

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
