import { ItaskFormValidate } from '@/lib/validations';
import { prisma } from '../../../prisma';
import type { Prisma } from '@prisma/client';

export const postData = (data: ItaskFormValidate & { assigneeId: string }) => {
  const { title, description, projectId, assigneeId } = data;
  return prisma.task.create({
    data: {
      title,
      description,
      projectId: projectId,
      assigneeId: assigneeId,
    },
  });
};
export const getMemberByOwner = (userId: string, projectId: string) => {
  return prisma.membership.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  });
};
export const getByIdproject = (id: string) => {
  return prisma.project.findUnique({ where: { id } });
};
export const getById = (id: string) => {
  return prisma.task.findUnique({ where: { id } });
};
export const delet = (id: string) => {
  return prisma.task.delete({ where: { id } });
};
export const findAll = (projeckId: string) => {
  return prisma.task.findMany({
    where: {
      // assigneeId: id,
      projectId: projeckId,
    },
    // include: {
    //   assignee: {
    //     include: {
    //       Membership: true,
    //     },
    //   },
    // },
  });
};
export const update = (id: string, data: Prisma.ProjectUpdateInput) => {
  return prisma.task.update({ where: { id }, data });
};
