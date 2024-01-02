const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const {storage}= require("../cloudconfig.js")
const multer  = require('multer')
const upload = multer({storage});


router
  .route("/")
  // index route
  .get(wrapAsync(listingController.index))
  // create route given validateListing as a middleware for this
  .post(isLoggedIn,  upload.single('listing[image]'), wrapAsync(listingController.showListing));

router.get("/new", isLoggedIn, listingController.renderNewForm);

// Edit route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
  );
  
router
  .route("/:id")
  // show route
  .get(wrapAsync(listingController.createListing))
  // update route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing))
  // delete route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


module.exports = router;
