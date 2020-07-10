const ocrFunc = require("./tesseractWorker");
const path = require("path");

module.exports = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.redirect("/");
    }

    const sampleFile = req.files.photo;

    await sampleFile.mv(path.join(__dirname, `../images/${sampleFile.name}`), err => {
        if (err) return res.redirect("/");
    });

    await ocrFunc(path.join(__dirname, `../images/${sampleFile.name}`), res);    
};