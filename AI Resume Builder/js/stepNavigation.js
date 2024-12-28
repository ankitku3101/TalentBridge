export function initStepNavigation(steps, nextBtns, prevBtns) {
  let currentStep = 0;
  console.log("Button")

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });
  }

  // Validate the current step
 function validateStep(step) {
    const requiredFields = step.querySelectorAll('[required]');
    let isValid = true;
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('is-invalid'); // Optional: Add visual feedback for invalid fields
      } else {
        field.classList.remove('is-invalid');
      }
    });
    return isValid;
  }

  // Event listener for "Next" buttons
  nextBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      console.log('Next button clicked');
      const isValid = validateStep(steps[currentStep]); // Validate the current step
      if (isValid) {
        currentStep++;
        console.log('Current step:', currentStep);
        if (currentStep < steps.length) {
          showStep(currentStep);
        } else if (onComplete) {
          onComplete(); // Trigger the completion callback
        }
      } else {
        alert("Please fill out all required fields before proceeding.");
      }
    })
  );

  // Event listener for "Previous" buttons
  prevBtns.forEach((btn) =>
    btn.addEventListener("click", function () {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    })
  );

  // Display the initial step
  showStep(currentStep);
}
