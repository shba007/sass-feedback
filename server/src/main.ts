import express from "express";

const app = express()
const port = 3000

app.get('/', (req, res) => {
	res.json({ "status": "ok" })
})

app.listen(port, () => {
	console.log(`[Server]: Running at http://127.0.0.1:${port}`);
})