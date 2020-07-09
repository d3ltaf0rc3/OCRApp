const { createWorker } = require('tesseract.js');

const worker = createWorker();

module.exports = async (imageLocation) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imageLocation);
    await worker.terminate();
    return text;
};