const errorHandler = (err, req, res, next) => {
    console.error(err.stack || err.message);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server error';
    res.status(statusCode).json({ message });
};

module.exports = errorHandler;
