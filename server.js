const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/fetch", async (req, res) => {
    const url = req.query.url;

    if (!url) return res.send("Missing URL");

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const text = await response.text();
        res.send(text);

    } catch (err) {
        res.send("Error: " + err.message);
    }
});

app.listen(PORT, () => {
    console.log("Running on port " + PORT);
});
