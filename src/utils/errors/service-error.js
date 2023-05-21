const { StatusCodes } = require('http-status-codes');
// const {Statuscodes} = require('http-status-codes')

class ServiceErrors extends Error{
    constructor(
        message = 'Something went wrong',
        explanation = 'Service layer error',
        statuscodes = StatusCodes.INTERNAL_SERVER_ERROR
    )
    {
        super();
        this.name = 'ServiceError'
        this.message = message
        this.explanation = explanation
        this.statuscodes = statuscodes
    }
}

module.exports = ServiceErrors;