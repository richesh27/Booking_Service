const {BookingRepository} = require("../repository/index");
const axios = require('axios');
const {FLIGHT_SERVICE_PATH} = require('../config/server-config');
const { ServiceError } = require("../utils/errors/index");


class BookingService {
    constructor (){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking (data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
            const response = await axios.get(getFlightRequestUrl);      //making an HTTP GET requst here to get particular flight
            const flightData = response.data.data;
            const priceOfFlight = flightData.price;
            if( data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the booking process','Insufficient seats in the flight')
            }
            const totalCost = priceOfFlight * data.noOfSeats;
            const bookingPayLoad = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayLoad);
            const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestUrl, {totalSeats: flightData.totalSeats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id, {status: "Booked"});
            return finalBooking;
        } 
        catch (error) {
            if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
                throw error;
            }

            throw new ServiceError();
        }
        
    }

}

module.exports = BookingService;