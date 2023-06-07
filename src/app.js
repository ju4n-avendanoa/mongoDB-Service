import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Mount the user router under the "/api/users" path
app.use("/api/users", userRouter);

export default app;
