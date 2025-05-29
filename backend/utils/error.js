class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
} 
const createError = (status, message) => {
    return new CustomError(status, message);
};
 
const errorHandler = (err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
 
module.exports = {
    CustomError,
    createError,
    errorHandler,
};
