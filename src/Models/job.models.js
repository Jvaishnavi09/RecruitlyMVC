export default class JobModel {
  constructor(
    id,
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings,
    jobposted,
    applicants,
    jobpostedby
  ) {
    this.id = id;
    this.jobcategory = jobcategory;
    this.jobdesignation = jobdesignation;
    this.joblocation = joblocation;
    this.companyname = companyname;
    this.salary = salary;
    this.applyby = applyby;
    this.skillsrequired = skillsrequired;
    this.numberofopenings = numberofopenings;
    this.jobposted = jobposted;
    this.applicants = applicants;
    this.jobpostedby = jobpostedby;
  }

  static getJobs() {
    return jobs;
  }
  static getJobById(id) {
    const job = jobs.find((job) => Number(job.id) === Number(id));
    return job;
  }
  static addJobs(
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings,
    jobposted,
    applicants,
    jobpostedby
  ) {
    const newJob = new JobModel(
      jobs.length + 1,
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
      jobposted,
      applicants,
      jobpostedby
    );
    jobs.push(newJob);
    return newJob;
  }
  static addApplicant(jobId, newApplicant) {
    jobs.map((job) => {
      if (job.id === jobId) {
        job.applicants.push(newApplicant);
      }
    });
  }
  static getJobsByrecruiterEmail(email) {
    const result = jobs.filter((job) => job.jobpostedby === email);
    return result;
  }
  static updateJobById(
    jobId,
    jobCategory,
    jobdesignation,
    jobLocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings
  ) {
    jobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        return {
          ...job,
          jobcategory: jobCategory,
          jobdesignation: jobdesignation,
          joblocation: jobLocation,
          companyname: companyname,
          salary: salary,
          applyby: applyby,
          skillsrequired: skillsrequired,
          numberofopenings: numberofopenings,
        };
      } else {
        return job;
      }
    });
  }
  static deleteById(jobid) {
    jobs = jobs.filter((job) => Number(job.id) !== Number(jobid));
  }
  static fetchApplicants(jobid) {
    const job = jobs.find((job) => Number(job.id) === Number(jobid));
    return job.applicants;
  }
  static getAppliedJobsByUserEmail(email) {
    let appliedJobs = jobs.filter((job) => {
      let flag = false;
      job.applicants.map((applicant) => {
        if (applicant.email === email) {
          flag = true;
        }
      });
      if (flag === true) {
        return job;
      }
    });
    return appliedJobs;
  }
  static getJobsByName(query) {
    return jobs.filter((job) =>
      job.jobdesignation.toLowerCase().includes(query.toLowerCase())
    );
  }
}
let jobs = [
  {
    id: "1",
    jobcategory: "Software Development",
    jobdesignation: "Full Stack Developer",
    joblocation: "New York, USA",
    companyname: "TechCorp",
    salary: "80,000 - 100,000",
    applyby: "2025-01-31",
    skillsrequired: ["JavaScript", "React", "Node.js", "MongoDB"],
    numberofopenings: 3,
    jobposted: "2025-01-01",
    applicants: [
      {
        id: "5",
        name: "Applicant_5",
        email: "email4@example.com",
        contact: "1234567895",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
      {
        id: "6",
        name: "Applicant_6",
        email: "applicant6@example.com",
        contact: "1234567896",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
      {
        id: "7",
        name: "Applicant_7",
        email: "email5@example.com",
        contact: "1234567897",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
    ],
    jobpostedby: "email1@example.com",
  },
  {
    id: "2",
    jobcategory: "Data Science",
    jobdesignation: "Data Analyst",
    joblocation: "San Francisco, USA",
    companyname: "DataExperts",
    salary: "70,000 - 90,000",
    applyby: "2025-02-15",
    skillsrequired: ["Python", "SQL", "Tableau"],
    numberofopenings: 2,
    jobposted: "2025-01-05",
    applicants: [
      {
        id: "8",
        name: "Applicant_8",
        email: "applicant8@example.com",
        contact: "1234567898",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
      {
        id: "9",
        name: "Applicant_9",
        email: "email4@example.com",
        contact: "1234567899",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
    ],
    jobpostedby: "email1@example.com",
  },
  {
    id: "3",
    jobcategory: "Cybersecurity",
    jobdesignation: "Security Engineer",
    joblocation: "Remote",
    companyname: "SecureTech",
    salary: "100,000 - 120,000",
    applyby: "2025-02-28",
    skillsrequired: ["Cybersecurity", "Firewalls", "Incident Response"],
    numberofopenings: 5,
    jobposted: "2025-01-10",
    applicants: [
      {
        id: "1",
        name: "joe",
        email: "joecrazy@gmail.com",
        contact: "1234567892",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
      {
        id: "2",
        name: "Applicant_2",
        email: "email5@example.com",
        contact: "1234567892",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
      {
        id: "3",
        name: "Applicant_3",
        email: "applicant3@example.com",
        contact: "1234567893",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
      {
        id: "4",
        name: "Applicant_4",
        email: "applicant4@example.com",
        contact: "1234567894",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
    ],
    jobpostedby: "email3@example.com",
  },
  {
    id: "4",
    jobcategory: "Marketing",
    jobdesignation: "Digital Marketing Specialist",
    joblocation: "Chicago, USA",
    companyname: "MarketMasters",
    salary: "60,000 - 75,000",
    applyby: "2025-02-10",
    skillsrequired: ["SEO", "Google Ads", "Social Media Marketing"],
    numberofopenings: 1,
    jobposted: "2025-01-12",
    applicants: [
      {
        id: "11",
        name: "Applicant_11",
        email: "email5@example.com",
        contact: "1234567891",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
      {
        id: "12",
        name: "Applicant_12",
        email: "applicant12@example.com",
        contact: "1234567892",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
    ],
    jobpostedby: "email3@example.com",
  },
  {
    id: "5",
    jobcategory: "Human Resources",
    jobdesignation: "HR Manager",
    joblocation: "Austin, USA",
    companyname: "PeopleFirst",
    salary: "85,000 - 95,000",
    applyby: "2025-02-20",
    skillsrequired: ["Recruitment", "Employee Relations", "Payroll"],
    numberofopenings: 1,
    jobposted: "2025-01-15",
    applicants: [
      {
        id: "14",
        name: "Applicant_14",
        email: "email5@example.com",
        contact: "1234567894",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
      {
        id: "15",
        name: "Applicant_15",
        email: "applicant15@example.com",
        contact: "1234567895",
        resumePath: "1736287369413-fakePDF1.pdf",
      },
    ],
    jobpostedby: "email3@example.com",
  },
];
