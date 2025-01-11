export const userAuth = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    res.redirect("/login");
  }
};
export const recruiterAuth = (req, res, next) => {
  if (req.session.userAccess === "recruiter") {
    next();
  } else {
    res.redirect("/Error");
  }
};
