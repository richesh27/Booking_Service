const {BookingService}  = require('../services/index');

const bookingService = new BookingService();
const { StatusCodes } = require('http-status-codes');

const {createChannel, publishMessage} = require('../utils/messageQueue');
const {REMINDER_BINDING_KEY}= require('../config/server-config')

class BookingController {
    constructor (channel) {
        this.channel = channel;
    }

    async sendMessageToQueue (req,res){
        const channel =  await createChannel();
        const data  = {message :"SUccessed"};
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: "Successfully published the message"
        })
    }


    async create (req,res) {
        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
            message : "Succefully created booking",
            success : true,
            err : {},
            data : response
        });
        } 
        catch (error) {
            return res.status(StatusCodes.OK).json({
                message : error.message,
                success : false,
                err : error.explanation,
                data : {}
            })
        }
    }
}


module.exports = BookingController