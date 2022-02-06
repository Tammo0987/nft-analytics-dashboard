import express from 'express';
import generate from "./generate.js";

const app = express();
const port = 5000;

app.get('/generate', (req, res) => {
    const metadata = JSON.parse(req.query.metadata);
    const compiledContract = generate(metadata);
    res.json(compiledContract);
});

app.listen(port, () => {
    console.log(`Backend app listening on port ${port}`);
});