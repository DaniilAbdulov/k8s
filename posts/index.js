import express from "express";

const app = express();
const PORT = 4002;

const url = "http://localhost:4003";
const k8sUrl = "http://comments";

app.get("/", async (req, res) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');

        if (!response.ok) {
            throw new Error('failed response');
        }

        const posts = await response.json();
        const firstPost = posts?.length ? posts[0] : null;

        if (firstPost) {
            const response = await fetch(k8sUrl); //k8sUrl | url
            const {comments} = await response.json();

            res.status(200).send({
                firstPost,
                comments
            });

            return;
        } else {
            throw new Error('firstPost is null');
        }
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
