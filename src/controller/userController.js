import express from "express";
import UserService from "../services/userServices.js";
import BorrowedBookService from "../services/borrowedBookServices.js";
import sendResponse from "../utils/responseSender.js";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';
import 'express-async-errors';
import NotFound from "../errors/notFound.js";

const router = express.Router();

// anyone can view all users
router.get("/", async (req, res) => {
  // Get all users
  const result = await UserService.getAll();
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

// loggedin user can only view their own user's data
router.get("/:id", async (req, res) => {
  // Check if user exists
  const result = await UserService.getById(req.params.id);
  const books = await BorrowedBookService.getAllByUserId(req.params.id);
  result.books = {
    past: books.filter(book => book.returnedAt !== null),
    present: books.filter(book => book.returnedAt === null),
  } 
  if (!result) {
    throw new NotFound("User not found");
  }
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

router.post("/:id/borrow/:bookId", async (req, res) => {
  const data = {
    userId: req.params.id,
    bookId: req.params.bookId,
    borrowedAt: new Date(),
  }
  const result = await BorrowedBookService.create(data);
  if (!result) {
    throw new NotFound("Borrowing book failed");
  }
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});

router.post("/:id/return/:bookId", async (req, res) => {
  const data = {
    returnedAt: new Date(),
    score : req.body.score,
  } 
  const result = await BorrowedBookService.update(req.params.id, req.params.bookId, data);
  if (
    result?.count === 0
  ) {
    throw new NotFound("This book is not borrowed by this user");
  }
  return sendResponse(res, StatusCodes.OK, result, ReasonPhrases.OK);
});



export default router;