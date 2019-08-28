const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validatePostInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.body = !isEmpty(data.body) ? data.body : "";
    
    // Email checks
    if (Validator.isEmpty(data.body)) {
        errors.body = "Buzz is required!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};