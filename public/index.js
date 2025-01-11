function handleClick(element) {
  const jobId = element.dataset.id;
  console.log(`Card with ID ${jobId} clicked!`);
  window.location.replace(`/jobs/${jobId}`);
}
function applyForJob(jobId) {
  window.location.href = `/jobs/${jobId}/apply`;
}
function EditTheJob(jobId) {
  console.log("reached function");
  window.location.href = `/jobs/${jobId}/edit`;
}
function handleSearchHero() {
  window.location.href = `/jobs`;
}
function DeleteTheJob(jobid) {
  window.location.href = `/jobs/${jobid}/delete`;
}
function fetchApplicants(jobid) {
  window.location.href = `/jobs/${jobid}/fetchApplicants`;
}
function handleResume(resumepath) {
  window.open(`/images/${resumepath}`);
}
