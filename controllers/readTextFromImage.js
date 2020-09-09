const ocrFunc = require("./tesseractWorker");
const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.redirect("/");
    }

    const sampleFile = req.files.photo;
    const filePath = path.join(__dirname, `../images/${sampleFile.name}`);

    if (!sampleFile.name.endsWith("jpg") &&
        !sampleFile.name.endsWith("png") &&
        !sampleFile.endsWith("bmp") &&
        !sampleFile.endsWith("pbm")) {
        return res.redirect("/");
    }

    fs.access(path.join(__dirname, "../images"), async err => {
        if (err && err.code === 'ENOENT') {
            fs.mkdir(path.join(__dirname, "../images"), err => {
                if (err) throw err;
            });
        }
        await sampleFile.mv(filePath, err => {
            if (err) return res.redirect("/");
        });

        await ocrFunc(filePath, res);
    });
};