const errorHandler = (err, req, res, next) => {
    return res.status(500).send("something broke")
}

module.exports = errorHandler