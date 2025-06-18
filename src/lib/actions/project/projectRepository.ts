import { IprojectFormValidate } from '@/lib/validations';
import { prisma } from '../../../prisma';

export const postData = (data: IprojectFormValidate) => {
  return prisma.project.create({
    data: {
      name: data.name,
      owner: {
        connect: { id: data.owner as string },
      },
      Membership: {
        create: {
          user: {
            connect: { id: data.owner as string },
          },
        },
      },
    },
    include: {
      Membership: true,
    },
  });
};


export const getById = (id: string) => {
  return prisma.project.findUnique({ where: { id } });
};

export const delet = (id: string) => {
  return prisma.project.delete({ where: { id } });
};

export const findAll = (userId: string) => {
  return prisma.project.findMany({
    where: {
      OR: [
        { ownerId: userId },
        {
          Membership: {
            some: {
              userId: userId,
            },
          },
        },
      ],
    },
    include: {
      owner: {
        select: {
          email: true,
          createdAt: true,
        },
      },
      Task: {
        select: {
          description: true,
        },
      },
      _count: {
        select: {
          Membership: true,
        },
      },
    },
  });
};
export const update = (
  id: string,
  data: Partial<{ name: string; owner?: string | undefined }>,
) => {
  return prisma.project.update({
    where: { id },
    data: {
      name: data.name,
      owner: {
        connect: { id: data.owner as string },
      },
    },
  });
};
