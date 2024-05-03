const { errorHandler } = require("./helpers");
const { uploadProcessedData } = require("./firebase");

async function handler(req, method) {
    try {
        if (method === "GET") {
            const path = req.path;
            const testURL = "https://i.ibb.co/X4WbthN/camphoto-824023566.jpg";

            if (path === "/test") {
                const data = await processTheReceipt(testURL);
                return JSON.stringify(data);
            }

            if (path === "/test-upload") {
                await uploadProcessedData();
                return "Success";
            }

            return "Hello Get";
        }

        const { body } = req;
        if (body && body.message) {
            const messageObj = body.message;
            await handleMessage(messageObj);
            return "Success";
        }

        return "Unknown request";
    } catch (error) {
        errorHandler(error, "mainIndexHandler");
    }
}

module.exports = handler;
