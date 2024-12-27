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
  
  resumeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    
    steps.forEach((step) => {
      if (!validateStep(step)) valid = false;
    });

    if (valid) {
      alert("Form submitted successfully!");
      console.log("Form Data:", new FormData(resumeForm));
    } else {
      alert("Please fill out all required fields before submitting.");
    }
  });

  // Ensure form fields are validated dynamically
  document.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
  });
});

// Function to validate a single field
function validateField(field) {
  if (!field.value.trim()) {
    field.classList.add("is-invalid");
    return false;
  } else {
    field.classList.remove("is-invalid");
    return true;
  }
}

