import axios from 'axios'
export const getRate = async (have, want) => {

    const options = {
        method: 'GET',
        url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
        params: {have: have, want: want, amount: '1'},
        headers: {
          'X-RapidAPI-Key': '17759eba15mshe774e1fb4996cfdp1ee92fjsnfa8b70713c84',
          'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
        }
      };
      
      try {
        let res = await axios.request(options);
        if (res.status === 200) {
            return res.data;
        } 
      } catch (error) {
        throw new Error(error.message)
      }
}

