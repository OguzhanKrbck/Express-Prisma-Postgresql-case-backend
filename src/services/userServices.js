import prisma from "../database/prisma.js";

const getAll = async () => {
  return prisma.user.findMany();
};

const getById = (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const updateById = async (id, payload) => {
  return prisma.user.update({ where: { id }, data: payload });
};


export default {
  getAll,
  getById,
  updateById,
};