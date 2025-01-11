import applicantModel from "../Models/applicant.models.js";
import JobModel from "../Models/job.models.js";
import sendMail from "../NodeMailer/mail.middleware.js";
export default class ApplicantController {
  getApplyForm(req, res) {
    res.render("ApplyJob", { error: "", id: req.params.id, layout: "layout" });
  }
  postapply(req, res) {
    const { InputName, InputEmail, InputContact } = req.body;
    const { id } = req.params;

    const applicant = applicantModel.addApplicant(
      Date.now().toString(),
      InputName,
      InputEmail,
      InputContact,
      `${req.file.filename}`
    );
    JobModel.addApplicant(id, applicant);
    sendMail(applicant.email, applicant.name, "ApplicationConfirmation");
    res.redirect("/jobs");
  }
}
