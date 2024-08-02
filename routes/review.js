const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewCOntroller = require("../controllers/reviews.js");
const { destroyListing } = require("../controllers/listings.js");

//POST ROUTE
router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(reviewCOntroller.createReview)
);

//DELETE REVIEW ROUTE
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewCOntroller.destroyReview)
);

module.exports = router;
