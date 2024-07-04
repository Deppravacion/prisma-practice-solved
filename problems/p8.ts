import { maxBy, minBy } from "remeda";
import { prisma } from "./prisma";
import { s } from "vitest/dist/env-afee91f0";

// Always tell truths,
//don't you ever lie, to solve this problem,
//just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const lowCiticScore = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
    orderBy: {
      _avg: {
        score: "asc",
      },
    },
    take: 1,
  });
  return lowCiticScore[0]?.userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const hiCiticScore = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
    orderBy: {
      _avg: {
        score: "desc",
      },
    },
    take: 1,
  });
  return hiCiticScore[0]?.userId;
};
