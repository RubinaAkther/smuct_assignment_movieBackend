const Movie = require("../models/movie.model.js");
const mongoose = require("mongoose");

// Create a movie
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      createdBy: req.user._id, // admin ID from token
    });
    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get movies with query, filter, sort, and pagination
const getMovies = async (req, res) => {
  try {
    const {
      search,
      genres,
      minRating,
      maxRating,
      yearFrom,
      yearTo,
      sort = "latest",
      page = 1,
      limit = 5,
    } = req.query;

    const query = {};

    if (search) query.title = { $regex: search, $options: "i" };
    if (genres) query.genre = { $in: genres.split(",") };

    if (minRating || maxRating) query.rating = {};
    if (minRating) query.rating.$gte = Number(minRating);
    if (maxRating) query.rating.$lte = Number(maxRating);

    if (yearFrom || yearTo) query.releaseDate = {};
    if (yearFrom) query.releaseDate.$gte = new Date(`${yearFrom}-01-01`);
    if (yearTo) query.releaseDate.$lte = new Date(`${yearTo}-12-31`);

    let sortOption = {};
    if (sort === "rating_high") sortOption = { rating: -1 };
    else if (sort === "rating_low") sortOption = { rating: 1 };
    else if (sort === "title_asc") sortOption = { title: 1 };
    else if (sort === "title_desc") sortOption = { title: -1 };
    else sortOption = { createdAt: -1 };

    const skip = (page - 1) * limit;

    const movies = await Movie.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Movie.countDocuments(query);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      movies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get movie details by ID
const getMovieDetails = async (req, res) => {
  try {
    const movieId = req.params.movieId.trim();
    if (!mongoose.Types.ObjectId.isValid(movieId))
      return res.status(400).json({ success: false, message: "Invalid movie ID" });

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });

    res.status(200).json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update movie
const updateMovies = async (req, res) => {
  try {
    const movieId = req.params.movieId.trim();
    if (!mongoose.Types.ObjectId.isValid(movieId))
      return res.status(400).json({ success: false, message: "Invalid movie ID" });

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });

    // Only update provided fields
    const { title, genre, releaseDate, director, rating } = req.body;
    if (title) movie.title = title;
    if (genre) movie.genre = genre;
    if (releaseDate) movie.releaseDate = releaseDate;
    if (director) movie.director = director;
    if (rating) movie.rating = rating;

    const updatedMovie = await movie.save();

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete movie
const deleteMovies = async (req, res) => {
  try {
    const movieId = req.params.movieId.trim();
    if (!mongoose.Types.ObjectId.isValid(movieId))
      return res.status(400).json({ success: false, message: "Invalid movie ID" });

    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });

    res.json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovieDetails,
  updateMovies,
  deleteMovies,
};
