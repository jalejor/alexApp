exports.success = function (req, res, message = 'Success ok', status = 200) {
    res.status(status).send({
        success: true,
        status: status,
        body: message,
    });
}

exports.error = function (req, res, message,status) {
    res.status(status).send({
        success: false,
        status: status,
        body: message,
    });
}
