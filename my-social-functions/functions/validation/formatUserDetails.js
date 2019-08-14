const isEmpty = require('is-empty');

// Format user details. (if they are not passed in from the client don't even create a key for it in our db document)
module.exports = function formatUserDetails(data) {
    let userDetails = {};

    if(!isEmpty(data.bio.trim())) {
        userDetails.bio = data.bio;
    }

    if(!isEmpty(data.website.trim())) {
        if(data.website.trim().substring(0, 4) !== 'http') {
            userDetails.website = `http://${data.website.trim()}`;
        } else {
            userDetails.website = data.website;
        }
    }

    if(!isEmpty(data.location.trim())) {
        userDetails.location = data.location;
    }

    return userDetails;
};