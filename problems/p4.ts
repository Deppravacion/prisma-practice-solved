import { prisma } from "./prisma";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = () => {
  const pg13Movies = prisma.movie.findMany({
    orderBy: {
      releaseYear: "desc",
    },
    where: {
      parentalRating: "PG-13",
    },
    select: {
      releaseYear: true,
      parentalRating: true,
    },
  });
  return pg13Movies;
};
