const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', // or 'live'
    'client_id': 'YOUR_PAYPAL_CLIENT_ID',
    'client_secret': 'YOUR_PAYPAL_CLIENT_SECRET'
});

// Create a payment
router.post('/create-payment', (req, res) => {
    const paymentData = {
        // Payment details from req.body
    };

    paypal.payment.create(paymentData, (error, payment) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(payment);
        }
    });
});

// Execute a payment
router.post('/execute-payment', (req, res) => {
    const { paymentId, payerId } = req.body;

    paypal.payment.execute(paymentId, { payer_id: payerId }, (error, payment) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(payment);
        }
    });
});

module.exports = router;
