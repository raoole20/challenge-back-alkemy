const express = require('express');
const { response } = express

const handleError = (res = response, msg, code = 404)=>{
    res.status(code).send({
        msg
    })
}

module.exports = handleError;