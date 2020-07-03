const { Router } = require('express');
const router = Router();
const stripe = require('stripe')('sk_test_51H07BXL0Vs2q39zFP55Im78mWTtqDOmR0OgQYQ5q8sb2qOXXKVnZFfE5XOeq2BfTSWyqghR0YZherg78oJnqLs8i00dEvmIhLb');

router.get('/', async (req, res) => {
    res.render('index')
});

router.post('/payments', async (req, res) => {
    console.log(req.body.stripeEmail, req.body.stripeToken);
    

    //Almaceno al cliente
   const newCustomer = stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });

    //Almaceno la orden de compra
   const charge = stripe.charges.create({
        amount: '120000',
        currency: 'usd',
        customer: newCustomer.id,
        description: 'McBook pro',
        source: 'tok_amex'
    });    

    res.render('descarga')
});

module.exports = router;