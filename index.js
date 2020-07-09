const express = require("express");
const fileupload = require("express-fileupload");
const readText = require("./controllers/readTextFromImage");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(fileupload());
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/", async (req, res) => {
    await readText(req, res);
});

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`);
});