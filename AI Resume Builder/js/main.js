import { initStepNavigation } from "./stepNavigation.js";
import { initDynamicEntries } from "./dynamicEntries.js";

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".next-step");
  const prevBtns = document.querySelectorAll(".prev-step");
  // const resumeForm = document.getElementById("resumeForm");

  initStepNavigation(steps, nextBtns, prevBtns, () => {
    alert("All steps completed! Ready to submit.");
  });

  initDynamicEntries();

  document.getElementById("project_title").addEventListener("blur", async function () {
      const projectTitle = this.value;
      const skills = document.getElementById("skills").value;

      if (projectTitle && skills) {
        const response = await fetch("http://0.0.0.0:8080/project-desc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ project_title: projectTitle, skills }),
        });
        console.log(response);
        const data = await response.json();
        document.getElementById("project_description").value = data.data;
      }
    });

  document.getElementById("job_title").addEventListener("blur", async function () {
      const jobTitle = this.value;
      const companyName = document.getElementById("company_name").value;

      if (jobTitle && companyName) {
        const response = await fetch("http://localhost:8080/job-desc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            job_title: jobTitle,
            company_name: companyName,
          }),
        });

        const data = await response.json();
        document.getElementById("job_description").value = data.data;
      }
    });

  document.getElementById("career_objective").addEventListener("blur", async function () {
      const skills = document.getElementById("skills").value;
      const pastExperience = document.getElementById("job_description").value;

      if (skills && pastExperience) {
        const response = await fetch("http://localhost:8080/career-obj", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills, past_experience: pastExperience }),
        });

        const data = await response.json();
        this.value = data.data;
      }
    });
});
