import userModel from "../Models/user.models.js";
import sendMail from "../NodeMailer/mail.middleware.js";
export default class UserController {
  constructor() {}
  login(req, res) {
    res.render("login", { data: [], layout: "layout" });
  }
  postlogin(req, res) {
    const { email, password } = req.body;
    const result = userModel.checkUser(email, password);
    if (result) {
      req.session.userEmail = email;
      req.session.userAccess = result.options;
      res.redirect("jobs");
    } else {
      res.render("login", { data: ["email and password doesnt match!"] });
    }
  }
  register(req, res) {
    res.render("register", { data: [] });
  }
  postRegister(req, res) {
    const { name, email, password1, options } = req.body;
    userModel.addUser(name, email, password1, options);
    sendMail(email, name, "RegisterConfirmation");
    res.redirect("/login");
  }
  logoutUser(req, res) {
    const now = new Date();
    res.cookie(
      "lastVisit",
      now.toDateString() + " : " + now.toLocaleTimeString(),
      {
        maxAge: 2 * 24 * 60 * 60 * 1000,
      }
    );
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.redirect("/Error");
      } else {
        res.redirect("/");
      }
    });
  }
}
