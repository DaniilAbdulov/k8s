import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 4001;

const url = "http://localhost:4002";
const k8sUrl = "http://posts";

app.get("/", async (req, res) => {
    console.log(`start req`)
    try {
        const [userResponse, responsePosts] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users?id=1'),
            fetch(k8sUrl)
        ]);

        const [[user], {firstPost, comments}] = await Promise.all([
            userResponse.json(),
            responsePosts.json()
        ]);

        return res.status(200).send({user, firstPost, comments});
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
