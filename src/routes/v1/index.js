const express = require ('express');

const router = express.Router();
const {BookingController}  = require('../../controllers/index');

//here goes the corresponding routes

router.post('/bookings', BookingController.create)

module.exports = router;