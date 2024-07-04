import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";
// hint:find all stars with the movies "included" on, then good ol'
//javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const movies = await prisma.movie.findMany();
  const ratings = await prisma.starRating.findMany();

  const targetMovies = movies.filter((movie) => {
    const specificRatings = ratings.filter(
      (rating) => rating.movieId === movie.id
    );
    const ratingAverage =
      specificRatings.reduce((acc, rating) => acc + rating.score, 0) /
      specificRatings.length;
    return ratingAverage > n;
  });
  return targetMovies;
};
