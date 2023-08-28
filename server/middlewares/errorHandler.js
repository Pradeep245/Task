class ErrorHandlerMiddleware extends Error {
    constructor(message, statusCode,status) {

        super(message);
        this.statusCode = statusCode || 500;
       this.status = status
       this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
       
    }
    
}

module.exports = ErrorHandlerMiddleware;