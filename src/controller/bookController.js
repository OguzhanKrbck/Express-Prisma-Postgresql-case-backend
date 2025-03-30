import express from "express";
import BookService from "../services/bookServices.js";
import sendResponse from "../utils/responseSender.js";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';
import 'express-async-errors';
import NotFound from "../errors/notFound.js";

const router = express.Router();

// anyone can view all books
router.get("/", async (req, res) => {
  // Get all books
  const result = await BookService.getAll();
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

// loggedin book can only view their own book's data
router.get("/:id", async (req, res) => {
  // Check if book exists
  const result = await BookService.getById(req.params.id);
  if (!result) {
    throw new NotFound("Book not found");
  }
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

export default router;