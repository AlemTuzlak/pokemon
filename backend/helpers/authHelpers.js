exports.authorized = (userId, entityOwnerId, errorMessage, statusCode) => {
    if(userId !== entityOwnerId){
        const error = new Error(errorMessage);
        error.statusCode = statusCode || 401;
        throw error;
    }
}

exports.entityExists = (entity, errorMessage, statusCode) => {
    if (!entity) {
        const error = new Error(errorMessage);
        error.statusCode = statusCode || 404;
        throw error;
    }
}