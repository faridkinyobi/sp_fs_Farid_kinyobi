import { prisma } from '../../../prisma';

type Iprops = {
  user: string;
  project: string;
};
export const postData = (data: Iprops) => {
  return prisma.membership.create({
    data: {
      user: { connect: { id: data.user } },
      project: { connect: { id: data.project } },
    },
  });
};
export const getUsersById = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const getByIdproject = (id: string) => {
  return prisma.project.findUnique({ where: { id } });
};

export const getByIdMemeber = (userId: string, projectId: string) => {
  return prisma.membership.findUnique({
    where: {
      userId_projectId: {
        userId: userId,
        projectId: projectId,
      },
    },
  });
};
export const deletMember = (id: string) => {
  return prisma.membership.delete({ where: { id } });
};

export const findAllMember = () => {
  return prisma.membership.findMany();
};
// export const update = (id: string, data: Prisma.ProjectUpdateInput) => {
//   return prisma.task.update({ where: { id }, data });
// };
