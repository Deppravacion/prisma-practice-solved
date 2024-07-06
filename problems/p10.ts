import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const deletedRatings = await prisma.starRating.deleteMany({
    where: {
      user: {
        age: {
          lt: n,
        },
      },
    },
  });

  if (!deletedRatings) return;

  await prisma.user.deleteMany({
    where: {
      age: {
        lt: n,
      },
    },
  });
};
