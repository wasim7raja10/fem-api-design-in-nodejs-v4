import express from "express";
import router from "./router";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
	console.log("Hello from Express!");
	res.status(200).json({ message: "Hello from Express!" });
});

app.use("/api", router);

export default app;
