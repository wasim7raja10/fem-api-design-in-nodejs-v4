import express from "express";
import router from "./router";

const app = express();

app.get("/", (req, res) => {
	console.log("Hello from Express!");
	res.status(200).json({ message: "Hello from Express!" });
});

app.use("/api", router);

export default app;
