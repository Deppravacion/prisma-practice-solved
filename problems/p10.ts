import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const deletedRating = await prisma.starRating.deleteMany({
    where: {
      user: {
        age: {
          lt: n,
        },
      },
    },
  });

  if (!deletedRating) return;

  return prisma.user.deleteMany({
    where: {
      age: {
        lt: n,
      },
    },
  });
};
