const express = require("express");
const readText = require("./controllers/readTextFromImage");
const app = express();

require("./config/express")(app);

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/", async (req, res) => {
    await readText(req, res);
});

app.listen(process.env.PORT, err => {
    if (err) throw err;
    console.log(`Server is running on port ${process.env.PORT}`);
});