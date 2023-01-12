const Promo = require('../models/utils/promo.model');


const addPromo = async (req, res) => {

    try {

        req.body.discount = parseInt(req.body.discount.slice(0, req.body.discount.length - 1))
        const promo = new Promo(req.body);
        await promo.save();
        
        res.status(200).json({
            promo: promo
        })

    } catch (error) {
        res.status(200).json({
            error: error.message   
         })
    }
}

const usePromo = async (req, res) => {

    try {
        let inpromo = await Promo.findOne({ "promoCode": req.body.promoCode })

        
        if (!inpromo || inpromo.expirationDate < Date.now())
        return res.status(200).json({msg : "Invalid Promo"})
        
        if (!inpromo.courses.includes(req.body.courseid)){
            return res.status(200).json({msg : "Invalid Promo"})
        }
        console.log(inpromo);

        res.status(200).json({
            msg: `promo added with discount ${inpromo.discount}%`  
         })


    } catch (error) {
        res.status(200).json({
            error: error.message   
         })
    }
}

module.exports = {addPromo, usePromo}