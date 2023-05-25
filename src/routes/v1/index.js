const express = require ('express');

const router = express.Router();
const {BookingController} = require('../../controllers/index') 
// const {createChannel} = require('../../utils/messageQueue')

// // const channel =  createChannel();
const bookingController = new BookingController();

//here goes the corresponding routes

router.post('/bookings',function(req, res){
    bookingController.Create
  });

  router.post ('/publish', bookingController.sendMessageToQueue);

module.exports = router;