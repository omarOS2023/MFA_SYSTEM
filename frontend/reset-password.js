const BASE_URL = "https://mfa-back.vercel.app/auth";

function handleNewPassword(event) {
  event.preventDefault();
  validatePassword();
}

function validatePassword() {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const span18 = document.getElementById("span18");
  const span19 = document.getElementById("span19");
  const token = sessionStorage.getItem("resetToken");

  span18.textContent = "";
  span19.textContent = "";

  // Basic frontend validation
  if (!newPassword) {
    span18.textContent = "Password is required";
    return;
  }

  if (newPassword.length < 8) {
    span18.textContent = "Password must be at least 8 characters long";
    return;
  }

  if (newPassword !== confirmPassword) {
    span19.textContent = "Passwords do not match";
    return;
  }

  // Send new password to backend
  fetch(`${BASE_URL}/resetpassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      newPassword,
      passwordConfirm: confirmPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        // Clear sessionStorage
        sessionStorage.removeItem("resetToken");
        sessionStorage.removeItem("resetEmail");
        // alert("Password successfully reset!");
        window.location.href = "login.html";
      } else {
        span18.textContent = data.message || "Error resetting password";
      }
    })
    .catch((error) => {
      span18.textContent = "Error resetting password";
      // console.error("Error:", error);
    });
}
