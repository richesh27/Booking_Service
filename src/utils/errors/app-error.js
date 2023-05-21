
class AppError extends Error {
    constructor(
        name,
        message,
        explanantion,
        statusCode
    ) {
        super();
        this.name = name;
        this.message = message;
        this.explanantion = explanantion;
        this.statusCode = statusCode
        
    }
}

module.exports = AppError;