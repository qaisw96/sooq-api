'use strict';

module.exports = (err, req, res, next) => {
    res.status(404).json({
        error: err,
        path: req.path
    })
}