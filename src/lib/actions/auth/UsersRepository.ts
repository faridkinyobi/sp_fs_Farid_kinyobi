import { prisma } from '../../../prisma';
import type { Prisma } from '@prisma/client';

export const postData = (data: Prisma.UserCreateInput) => {
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
    },
  });
};
export const getEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const getById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};
export const delet= (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};
export const findAll = () => {
  return prisma.user.findMany();
};
export const update = (id: string, data: string[]) => {
  return prisma.user.update({ where: { id }, data });
};
