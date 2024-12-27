// Function to validate a single field
function validateField(field) {
  // Clear any existing error messages first
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Check if the field is empty
  if (!field.value.trim()) {
    field.classList.add("is-invalid");  // Add the invalid class for styling

    // Create and append an error message below the field
    const error = document.createElement('div');
    error.className = 'error-message';  // Class for error styling
    error.textContent = 'This field is required.';
    field.parentNode.appendChild(error);

    return false;  // Return false indicating the field is invalid
  } else {
    field.classList.remove("is-invalid");  // Remove the invalid class if field is valid
    return true;  // Return true indicating the field is valid
  }
}


// Helper function to validate email format
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
