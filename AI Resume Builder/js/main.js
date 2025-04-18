import { initStepNavigation } from "./stepNavigation.js";
import { initDynamicEntries } from "./dynamicEntries.js";

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".next-step");
  const prevBtns = document.querySelectorAll(".prev-step");
  const resumeForm = document.getElementById("resumeForm");

  initStepNavigation(steps, nextBtns, prevBtns, () => {
    alert("All steps completed! Ready to submit.");
  });

  initDynamicEntries();

  document.getElementById("project_description").addEventListener('click', async function () {
      const projectTitle = document.getElementById('project_title').value;
      const skills = document.getElementById("skills").value;

      if (projectTitle && skills) {
        const response = await fetch("https://mole-model-drake.ngrok-free.app/project-desc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            project_title: projectTitle, 
            skills: skills
          }),
        });

        const data = await response.json();
        this.value = data.data;
      }
    });

  document.getElementById("job_description").addEventListener('click', async function () {
    const jobTitle = document.getElementById("job_title").value;
    const companyName = document.getElementById("company_name").value;

    if (jobTitle && companyName) {
      const response = await fetch("https://mole-model-drake.ngrok-free.app/job-desc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_title: jobTitle,
          company_name: companyName,
        }),
      });

      const data = await response.json();
      this.value = data.data;
    }
  });

  document.getElementById("career_objective").addEventListener('click', async function () {
      const skills = document.getElementById("skills").value;
      const pastExperience = document.getElementById("job_description").value;

      if (skills && pastExperience) {
        const response = await fetch("https://mole-model-drake.ngrok-free.app/career-obj", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            skills: skills, 
            past_experience: pastExperience,
          }),
        });

        const data = await response.json();
        this.value = data.data;
      }
    });
  
  resumeForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      job_title: document.getElementById("job_title").value,
      address: document.getElementById("location").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      career_objective: document.getElementById("career_objective").value,
      education: Array.from(document.querySelectorAll(".education-entry")).map(entry => ({
        degree: entry.querySelector('[name="degree[]"]').value,
        institute: entry.querySelector('[name="institution[]"]').value,
        year: entry.querySelector('[name="year[]"]').value,
      })),
      skills: document.getElementById("skills").value.split(","),
      projects: Array.from(document.querySelectorAll(".project-entry")).map(entry => ({
        name: entry.querySelector('[name="projectTitle[]"]').value,
        description: entry.querySelector('[name="projectDescription[]"]').value,
      })),      
    };

    // Send the form data to the backend to save as JSON and generate the resume
    const response = await fetch("https://mole-model-drake.ngrok-free.app/generate-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      const filename = data.downloaded; // Extract the filename from the response
      
      const downloadLink = document.createElement("a");
      downloadLink.href = `https://mole-model-drake.ngrok-free.app/download/${filename}`;
      downloadLink.textContent = "Download your resume";
      downloadLink.download = filename; 
      downloadLink.style.display = "block";
      downloadLink.style.marginTop = "20px";
      downloadLink.style.color="black";
      document.body.appendChild(downloadLink);
    } else {
      alert("Error generating resume. Please try again.");
    } 
  });
});