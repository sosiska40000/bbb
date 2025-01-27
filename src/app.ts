import express from "express";
import { router } from "./modules/router";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();
const PORT = 443;

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});
