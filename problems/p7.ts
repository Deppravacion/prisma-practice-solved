import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const ratings = await prisma.starRating.findMany({
    where: { userId },
  });
  return ratings.reduceRight((a, c) => a + c.score, 0) / ratings.length;
};
