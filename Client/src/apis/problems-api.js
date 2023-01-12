import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/reports'

export const getAllReports = async () => {

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

export const postReport = async (values) => {

    try {
        let res = await axios.request({
            method: 'POST',
            url: baseUrl ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },     
            data: JSON.stringify(values)      
        })
        return res
        
    } catch (error) {
        throw new Error(error)
    }
}

export const makeSeen = async (id) => {

    try {
        let res = await axios.request({
            method: 'GET',
            url: baseUrl + `/seen/${id}` ,
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


export const getUserReports = async (id) => {

    try {
        let res = await axios.request({
            method: 'GET',
            url: baseUrl + `/user/${id}` ,
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

export const resolveProblem = async (id) => {

    try {
        let res = await axios.request({
            method: 'GET',
            url: baseUrl + `/resolve/${id}` ,
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