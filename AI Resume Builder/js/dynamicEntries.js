export function addDynamicEntry(containerId, entryClass) {
  const container = document.getElementById(containerId); // Target container
  const entry = document.querySelector(`.${entryClass}`).cloneNode(true); // Clone entry template

  // Clear the values of all input and textarea fields in the cloned entry
  entry.querySelectorAll("input, textarea").forEach((field) => (field.value = ""));
  
  // Append the cloned entry to the container
  container.appendChild(entry);
}

export function initDynamicEntries() {
  // Dynamically add Education entries
  document.getElementById("addEducation")?.addEventListener("click", () => {
    addDynamicEntry("educationEntries", "education-entry");
  });

  // Dynamically add Project entries
  document.getElementById("addProject")?.addEventListener("click", () => {
    addDynamicEntry("projectEntries", "project-entry");
  });

  // Dynamically add Experience entries
  document.getElementById("addExperience")?.addEventListener("click", () => {
    addDynamicEntry("experienceEntries", "experience-entry");
  });

}
