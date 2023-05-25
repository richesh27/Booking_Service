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
        const payload  = {
            data:{
                subject : 'This subject is for queue',
                content : "Some queue will subscribe this",
                recepientEmail : "richesh.27kunwar@gmail.com",
                notificationTime : "2023-05-25T17:05:00"
            },
            service: "CREATE_TICKET"
        };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
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