import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const movies = await prisma.movie.findMany();
  const ratings = await prisma.starRating.findMany({
    where: { userId },
  });

  const userWatchedMovies = movies.filter((movie) => {
    const userRating = ratings.filter((rating) => rating.movieId === movie.id);
    return userRating.length > 0;
  });
  return userWatchedMovies;
};
