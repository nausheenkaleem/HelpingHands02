const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/payment')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)

const stripe = require('stripe')('sk_test_51McFcDD7yKPgI5WMnFixSWhOnjuw6eNHgJWgINVlNlyuqeEkIo7NZvFXHvfJaSeP3OK06BKLQAXLzMydu0l3fNTi00rdfKHvYS');
const {v4 :uuidv4} = require('uuid');

router.get('/get-customer', async function(req, res, next) {
    console.log("Get Response")
    const customers = await stripe.paymentIntents.list({
        limit:200000
      });
    res.json({
        message:customers
    })
})

router.get('/pay', async function(req, res, next) {
   try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 3333,
        currency: 'usd',
        automatic_payment_methods: {enabled: true},
      })
    
    res.json({
        message:paymentIntent
    })
    return paymentIntent['message']['id']
   } catch (error) {
    console.log(error)
   }
})
router.get('/confirm', async function(req, res, next){
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(
            'pi_3NAqdlD7yKPgI5WM18MPoGUq',
            {payment_method: 'pm_card_visa'}
          );
          res.json({
            message:paymentIntent
        })
        
    } catch (error) {
        console.log(error)
    }
})
module.exports = router
