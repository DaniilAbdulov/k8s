import express from "express";

const app = express();
const PORT = 4003;

app.get("/", async (req, res) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1');
        const comments = await response.json();

        if (comments?.length) {
          return  res.status(200).send({ comments });
        }

        return [];
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
