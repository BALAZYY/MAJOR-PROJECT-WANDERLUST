const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage });
router
  .route("/")
  //index
  .get(wrapAsync(listingController.index))
  // create
  .post(
    isLoggedIn,
    upload.single("listing[image]"),  
    validateListing,
    wrapAsync(listingController.createListing)
  );

//NEW (FORM) ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  //show route
  .get(wrapAsync(listingController.showListing))
  //update route
  .put(
    isLoggedIn,
    upload.single("listing[image]"), 
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  //delete
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//EDIT (FORM) ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
