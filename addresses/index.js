import express from "express";

const app = express();
const PORT = 4003;
const url = "http://localhost:4002";
const k8sUrl = "http://phones";

app.get("/", async (req, res) => {
    console.log(`addresses`);
    try {
        const response = await fetch(k8sUrl);
        const { phone } = await response.json();

        res.status(200).send({ address: "Moscow", phone });
    } catch (error) {
        console.log(error);
        res.send({ error: `${error}` });
    }
});

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
