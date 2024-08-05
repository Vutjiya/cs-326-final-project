import express from "express";
import logger from "morgan";

const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:3000`));
app.use(logger("dev"));
app.use(express.json());
app.use(express.static("src/frontend"));
app.use(express.urlencoded({ extended: false }));

app.route("/rainbow").post(async (req, res) => {
        const destination = req.body;
        console.log(destination);
        res.send(destination);
        res.end()
    });