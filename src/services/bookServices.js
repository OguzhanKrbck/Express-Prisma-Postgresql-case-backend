import prisma from "../database/prisma.js";


const getAll = async () => {
    return prisma.book.findMany();
};

const getById = (id) => {
    return prisma.book.findUnique({ where: { id } });
};

const updateById = async (id, payload) => {
    return prisma.book.update({ where: { id }, data: payload });
};



export default { getAll, getById, updateById };