import prisma from "../database/prisma.js";

const getAllByUserId = async (userId) => {
  return prisma.borrowedBook.findMany({ 
    where: { userId: userId },
    include: { 
      book: {
        select: {
          name: true,
        }
      }
    }
  });
};

const create = async (payload) => {
    return prisma.borrowedBook.create({ data: payload });
};

const getById = (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const update = async (userId, bookId, payload) => {
   return prisma.borrowedBook.updateMany({
        where: {
            userId: userId,
            bookId: bookId,
            returnedAt: null
        },
        data: payload
    })
};


export default {
  getAllByUserId,
  create,
  getById,
  update,
};