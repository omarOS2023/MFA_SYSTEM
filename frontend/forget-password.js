const BASE_URL = "https://mfa-back.vercel.app/auth"; // Remove trailing slash

function handleResetPassword(event) {
  event.preventDefault();
  const email = document.getElementById("emreset").value;
  const span17 = document.getElementById("span17");

  span17.textContent = "";

  if (!email) {
    span17.textContent = "The email is required";
    return;
  }

  // Store email in sessionStorage for resend OTP
  sessionStorage.setItem("resetEmail", email);

  // Send email to backend for forget password
  fetch(`${BASE_URL}/forgetpass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Email: email }),
  })
    .then((response) => {
      // console.log("Response Status:", response.status);
      // console.log("Response Headers:", response.headers);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Response Data:", data);
      if (data.status === "Success") {
        sessionStorage.setItem("resetToken", data.token);
        showOtpPopup();
      } else {
        span17.textContent =
          data.message || "There is a problem sending the code";
      }
    })
    .catch((error) => {
      // console.error("Error:", error);
      span17.textContent = "There is a server problem, try again later";
    });
}

function showOtpPopup() {
  document.getElementById("otpPopup").style.display = "flex";
}

function resendOtp() {
  const email = sessionStorage.getItem("resetEmail");
  const span17 = document.getElementById("span17");

  if (!email) {
    span17.textContent = "No email saved, start from the beginning";
    return;
  }

  fetch(`${BASE_URL}/forgetpass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Email: email }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "Success") {
        sessionStorage.setItem("resetToken", data.token);
        // alert("The OTP has been resent to your email");
      } else {
        span17.textContent =
          data.message || "There is a problem resending the OTP";
      }
    })
    .catch((error) => {
      span17.textContent = "There is a server problem, try again later";
      // console.error("Error:", error);
    });
}

function goToNextPage() {
  const otpInputs = document.querySelectorAll(".otp-digit");
  const otpError = document.getElementById("otpError");
  const token = sessionStorage.getItem("resetToken");

  otpError.textContent = ""; // Clear previous error

  const resetCode = Array.from(otpInputs)
    .map((input) => input.value)
    .join("");

  if (resetCode.length !== 6) {
    otpError.textContent = "You must enter a 6-digit code";
    return;
  }

  fetch(`${BASE_URL}/verifycode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ resetCode }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(
            err.message || `HTTP error! Status: ${response.status}`
          );
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "Success") {
        sessionStorage.setItem("resetToken", data.token);
        window.location.href = "reset-password.html";
      } else {
        otpError.textContent =
          data.message || "The code is incorrect or expired"; // Ensure message is displayed
        otpError.style.display = "block"; // Show the error span
      }
    })
    .catch((error) => {
      otpError.textContent =
        error.message || "There is a problem verifying the code";
      otpError.style.display = "block"; // Ensure the error is visible
      // console.error("Error:", error);
    });
}

const otpInputs = document.querySelectorAll(".otp-digit");
otpInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
});
