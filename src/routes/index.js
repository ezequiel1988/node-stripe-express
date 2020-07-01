const { Router } = require('express');
const router = Router();
const stripe = require('stripe')('private-key');

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