const fs = require("fs");

module.exports = async (imageLocation, res) => {
    const { createWorker } = require('tesseract.js');
    const worker = createWorker();

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imageLocation);
    await worker.terminate();
    
    fs.unlink(imageLocation, (err) => {
        if (err) console.error(err);
    });

    return res.render("result", {
        title: "Home | OCR App",
        text
    });
};