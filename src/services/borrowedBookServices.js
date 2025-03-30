import prisma from "../database/prisma.js";

const getAllByUserId = async (userId) => {
  return prisma.borrowedBook.findMany({ 
    where: { userId: userId },
    include: { 
      book: {
        select: {
          name: true,
          author: true,
          coverImage: true,
        }
      }
    }
  });
};

const getCurrentOwner = async (bookId) => {
  return prisma.borrowedBook.findMany({ 
    where: { 
      bookId: bookId,
      returnedAt: null,
    },
    include: { 
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        } 
      }
    }
  });
};

const getAverageScoreByBookId = async (bookId) => {
  const result = await prisma.borrowedBook.aggregate({
    where: {
      bookId: bookId,
      score: { not: null }
    },
    _avg: {
      score: true
    }
  });

  return result._avg.score; // Ortalama puanı döndür
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
  getCurrentOwner,
  getAverageScoreByBookId
};