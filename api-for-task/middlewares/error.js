
class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.status = statusCode;
    }
}

export const errorMiddleware = (error, req, res, next)=>{

    error.message = error.message || "Internal server Error";
    error.status = error.status || 500;
    return res.status(error.status).json({
        success: false,
        message: error.message
    })
}

export default ErrorHandler