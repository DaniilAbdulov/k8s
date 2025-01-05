import express from "express";

const app = express();
const PORT = 4002;

app.get("/", async (req, res) => {
    try {
        res.status(200).send({
            phone: "89220028666",
        });
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
