import express from "express";

const app = express();
const PORT = 4001;
const url = "http://localhost:4003";
const k8sUrl = "http://addresses";

app.get("/", async (req, res) => {
    try {
        const response = await fetch(k8sUrl);
        const { address, phone } = await response.json();

        res.status(200).send({ user: "Daniil Abdulov", address, phone });
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
