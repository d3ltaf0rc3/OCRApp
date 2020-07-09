const express = require("express");
const fileupload = require("express-fileupload");
const readText = require("./controllers/readTextFromImage");
const handlebars = require("express-handlebars");
const app = express();
const PORT = 3000;

app.engine("hbs", handlebars({
    extname: "hbs"
}));
app.set("view engine", "hbs");
app.use(fileupload());
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.render("home", {
        title: "Home | OCR App"
    });
});

app.post("/", async (req, res) => {
    await readText(req, res);
});

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`);
});