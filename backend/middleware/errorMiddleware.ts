// Middleware = functions that execute during the request response cycle (when a request is made)

const errorHandler = (err: any, req: any, res: any, next: any) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    // res.statusCode is the code coming from the controller, if it is present use that, otherwise use 500 (server error)

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
        // only show stack if in development
    })
}

export default errorHandler
