const Listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const regUser = await User.register(newUser, password);
    req.login(regUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};
module.exports.login = async (req, res) => {
  req.flash("success", "welcome back!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "logged Out");
    res.redirect("/listings");
  });
};
