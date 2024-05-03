function errorHandler(error, name, from) {
    let loggerFunction = console.log;

    // Start logging
    loggerFunction("-----------START-----------");
    loggerFunction(`Error occurred in ${name}`);

    // Check the source of the error
    if (from === "axios") {
        if (error.response) {
            // The request was made and the server responded with a status outside the range of 2xx
            loggerFunction(error.response.data);
            loggerFunction(error.response.status);
            loggerFunction(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // This usually means an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
            loggerFunction(error.request);
        } else {
            // Something else triggered the error
            loggerFunction("Error", error.message);
        }
        loggerFunction(error.toJSON());
    } else {
        loggerFunction(error);
    }

    // End logging
    loggerFunction("------------END------------");
}

module.exports = {
    errorHandler
};
