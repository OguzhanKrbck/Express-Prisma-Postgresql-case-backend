import express from "express";
import apiRouter from "./routes.api.js";

const router = express.Router();

router.use("/", apiRouter);

export default router;
