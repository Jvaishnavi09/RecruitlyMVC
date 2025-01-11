const setLastVisit = (req, res, next) => {
  const now = new Date();
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = req.cookies.lastVisit;
  }
  next();
};
export default setLastVisit;
