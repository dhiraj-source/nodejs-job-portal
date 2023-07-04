const errorMiddleware = async (err, req, res, next) => {
    // console.log(err)
    const defaultErrors = {
        statusCode: 400,
        message: err
    }
    //
    if (err.name === 'ValidationError') {
        defaultErrors.statusCode = 400
        defaultErrors.message = Object.values(err.errors).map(item => item.message).join(',')
    }
    //duplicate error
    if (err.code && err.code === 11000) {
        defaultErrors.statusCode = 400;
        defaultErrors.message = `${Object.keys(err.keyValue)} field must be unique`
    }


    res.status(defaultErrors.statusCode).json({ message: defaultErrors.message })

}

export default errorMiddleware;