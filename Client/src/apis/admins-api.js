import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/admins'

export const createAdmin = async (admin, credentials) => {

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

