module.exports = async (imageLocation, req, res) => {
    const { createWorker } = require('tesseract.js');

    const worker = createWorker();

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imageLocation);
    await worker.terminate();
    return res.render("result", {
        title: "Home | OCR App",
        text
    });
};