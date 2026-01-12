const express = require('express');
const router = express.Router();

const movieControllers = require('../controllers/movie.controller.js');
const authenticate = require('../middlewares/auth.middleware.js');
const adminOnly = require('../middlewares/admin.middleware.js');

// Public routes
router.get('/all', movieControllers.getMovies);
router.get('/:id', movieControllers.getMovieDetails);

// Protected routes
router.post(
  '/create',
  authenticate,
  movieControllers.createMovie
);

router.put(
  '/:movieId',
  authenticate,
  adminOnly,
  movieControllers.updateMovies
);

router.delete(
  '/:movieId',
  authenticate,
  adminOnly,
  movieControllers.deleteMovies
);

module.exports = router;
