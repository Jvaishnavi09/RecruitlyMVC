import JobModel from "../Models/job.models.js";
import { skills } from "../../constants/dropDownMenu.js";
import { jobCategories as jobCate } from "../../constants/dropDownMenu.js";
import { jobDesignations as jobDesi } from "../../constants/dropDownMenu.js";
import { locations } from "../../constants/dropDownMenu.js";
export default class JobController {
  getHomePage(req, res) {
    res.render("HeroSections");
  }
  getJobs(req, res) {
    const jobs = JobModel.getJobs();
    res.render("JobPage", { jobs });
  }
  getNewJobPage(req, res) {
    res.render("JobPostForm", {
      skills,
      jobCate,
      jobDesi,
      locations,
      data: [],
    });
  }
  getJobById(req, res) {
    const { id } = req.params;
    const job = JobModel.getJobById(id);
    if (req.session.userAccess === "recruiter") {
      res.render("JobDetails", { job, submit: false });
    } else {
      res.render("JobDetails", { job, submit: true });
    }
  }
  addjobs(req, res) {
    const {
      jobCategory,
      jobdesignation,
      jobLocation,
      minimumpay,
      maximumpay,
      companyname,
      applyby,
      skillsrequired,
      numberofopenings,
    } = req.body;
    const now = new Date().toISOString();

    JobModel.addJobs(
      jobCategory,
      jobdesignation,
      jobLocation,
      companyname,
      minimumpay + "-" + maximumpay,
      applyby,
      skillsrequired,
      numberofopenings,
      now.slice(0, 10),
      [],
      req.session.userEmail
    );

    res.redirect("/jobs");
  }
  getErrorPage(req, res) {
    res.render("Error");
  }
  getEditForm(req, res) {
    const { id } = req.params;
    const job = JobModel.getJobById(id);
    res.render("recruiterEditPage", {
      job,
      skills,
      jobCate,
      jobDesi,
      locations,
    });
  }
  getCreatedJobPage(req, res) {
    const jobs = JobModel.getJobsByrecruiterEmail(req.session.userEmail);
    res.render("JobPage", { jobs });
  }
  updateJob(req, res) {
    const { id } = req.params;
    const {
      jobCategory,
      jobdesignation,
      jobLocation,
      companyname,
      minimumpay,
      maximumpay,
      applyby,
      skillsrequired,
      numberofopenings,
    } = req.body;
    let salary = minimumpay + "-" + maximumpay;
    JobModel.updateJobById(
      id,
      jobCategory,
      jobdesignation,
      jobLocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings
    );
    res.redirect("/jobsCreated");
  }
  deleteJobById(req, res) {
    const { id } = req.params;
    JobModel.deleteById(id);
    res.redirect("/jobsCreated");
  }
  fetchApplicants(req, res) {
    const { id } = req.params;
    const applicants = JobModel.fetchApplicants(id);
    res.render("ApplicantsPage", { applicants });
  }
  getAppliedJobsByUserEmail(req, res) {
    let jobs = JobModel.getAppliedJobsByUserEmail(req.session.userEmail);
    res.render("JobPage", { jobs });
  }
  getJobsByName(req, res) {
    const { query } = req.query;
    let jobs = JobModel.getJobsByName(query);
    res.render("JobPage", { jobs });
  }
}
