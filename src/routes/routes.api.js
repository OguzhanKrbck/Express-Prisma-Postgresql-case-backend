import express from "express";
import userController from "../controller/userController.js";
import bookController from "../controller/bookController.js";
import sendResponse from "../utils/responseSender.js";
import {
	StatusCodes,
} from 'http-status-codes';

const router = express.Router();

router.get("/", (req, res) => {
  return sendResponse(res, StatusCodes.OK, null, "API Router is working");
});

router.use("/users", userController);
router.use("/books", bookController);

router.all("*", (req, res) => {
  return sendResponse(res, StatusCodes.NOT_FOUND, null, `Can't find ${req.originalUrl} on this server!`);
});

export default router;
