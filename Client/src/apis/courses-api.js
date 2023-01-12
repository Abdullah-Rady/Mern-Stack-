import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/courses'

export const createCourse = async (course, credentials) => {
    try{
        let res = await axios.request({
            method: 'POST',
            url: baseUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
            },
            data: JSON.stringify(course)
            
        })  
        return res
    }catch(err){
        throw new Error(err);
    }
}

export const listCourses = async () => {
    try{
        let res = await axios.request({
            method: 'GET',
            url: baseUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            }
        })
        
        return res

    }catch(err){
        throw new Error(err);
    }
}

export const getCourse = async (id) => {
    try{
        let res = await axios.request({
            method: 'GET',
            url: baseUrl + '/' + id,
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

export const searchCourses = async (filters) => {
    try{
        let res = await axios.request({
            method: 'POST',
            url: baseUrl + '/search',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(filters)
        })
        
        return res

    }catch(err){
        throw new Error(err);
    }
}



export const instructorCourses = async (id) => {
    try{
        let res = await axios.request({
            method: 'GET',
            url: baseUrl + `/coursesinstructor/${id}` ,
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


export const addRating = async (id, rate) => {
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

export const addLesson = async (credentials, id, lesson) => {
    try{
        let res = await axios.request({
            method: 'POST',
            url: baseUrl + `/${id}/addlesson`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials

            },
            data: JSON.stringify(lesson)
        })
        return res
    }catch(error){
        throw new Error(error)
    }
}

export const addExam = async (credentials, id, lesson) => {
    try{
        let res = await axios.request({
            method: 'POST',
            url: baseUrl + `/${id}/addexam`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials

            },
            data: JSON.stringify(lesson)
        })
        return res
    }catch(error){
        throw new Error(error)
    }
}