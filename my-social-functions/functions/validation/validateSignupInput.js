const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateSignupInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    // Name checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 & 30 characters";
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match";
    }

    // isValid = true if errors object is empty :)
    return {
        errors,
        isValid: isEmpty(errors)
    };
};