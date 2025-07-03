function test(e) {
  e.preventDefault();
}

var regex2 = /^[a-zA-Z ]{2,30}$/;
var inp2 = document.getElementById("name");
var regex3 = /^01[0-2,5]{1}[0-9]{8}$/;
var inp3 = document.getElementById("phone");
var regex4 = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
var inp4 = document.getElementById("email");
var inp5 = document.getElementById("message");

function Validation2() {
  var inpval2 = inp2.value;
  var span2 = document.getElementById("span2");
  var inpval3 = inp3.value;
  var span3 = document.getElementById("span3");
  var inpval4 = inp4.value;
  var span4 = document.getElementById("span4");
  var inpval5 = inp5.value;
  var span5 = document.getElementById("span5");

  let isValid = true;

  // Validate Name
  if (inpval2 === "") {
    span2.textContent = "*";
    span2.style.display = "inline";
    inp2.style.color = "black";
    isValid = false;
  } else if (!regex2.test(inpval2)) {
    span2.textContent = "";
    inp2.style.color = "red";
    isValid = false;
  } else {
    inp2.style.color = "black";
    span2.textContent = "";
    span2.style.display = "inline";
  }

  // Validate Phone
  if (inpval3 === "") {
    span3.textContent = "*";
    span3.style.display = "inline";
    inp3.style.color = "black";
    isValid = false;
  } else if (!regex3.test(inpval3)) {
    span3.textContent = "";
    inp3.style.color = "red";
    isValid = false;
  } else {
    inp3.style.color = "black";
    span3.textContent = "";
    span3.style.display = "inline";
  }

  // Validate Email
  if (inpval4 === "") {
    span4.textContent = "*";
    span4.style.display = "inline";
    inp4.style.color = "black";
    isValid = false;
  } else if (!regex4.test(inpval4)) {
    span4.textContent = "";
    inp4.style.color = "red";
    isValid = false;
  } else {
    inp4.style.color = "black";
    span4.textContent = "";
    span4.style.display = "inline";
  }

  // Validate Message
  if (inpval5 === "") {
    span5.textContent = "*";
    inp5.style.color = "black";
    isValid = false;
  } else {
    inp5.style.color = "black";
    span5.textContent = "";
    span5.style.display = "inline";
  }

  // If all validations pass, send data to the backend
  if (isValid) {
    const formData = {
      userName: inpval2,
      Phone: inpval3,
      Email: inpval4,
      message: inpval5,
    };

    fetch("https://mfa-back.vercel.app/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(
              `Failed with status ${response.status}: ${
                data.message || "Unknown error"
              }`
            );
          });
        }
      })
      .then((data) => {
        alert("Message sent successfully!");
        // Clear the form
        inp2.value = "";
        inp3.value = "";
        inp4.value = "";
        inp5.value = "";
      })
      .catch((error) => {
        console.error("Error:", error.message); // Debug: Show detailed error with server message
        alert("An error occurred: " + error.message);
      });
  }
}

var regexfName = /^[a-zA-Z ]{2,30}$/;
var fn = document.getElementById("fname");
var regexlName = /^[a-zA-Z ]{2,30}$/;
var ln = document.getElementById("lname");
var regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
var em = document.getElementById("em");
var regxphone = /^01[0-2,5]{1}[0-9]{8}$/;
var ph = document.getElementById("ph");
var regxpass = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9])[A-Za-z0-9\W_]{8,}$/;
var pass = document.getElementById("pass");
// هذا التعبير المنتظم يتحقق من صلاحية اسم المستخدم بناءً على الشروط التالية:
// - يجب أن يبدأ الاسم بحرف إنجليزي (كبير أو صغير).
// - يمكن أن يحتوي بعد ذلك على حروف إنجليزية، أرقام، نقاط (.) أو شرطات سفلية (_) فقط.
// - يجب أن يتراوح طوله بين 3 إلى 20 حرفًا.
// - لا يُسمح بالفراغات أو الرموز الخاصة الأخرى.
var regxcountry = /^[a-zA-Z][a-zA-Z0-9_.]{2,19}$/;
var country = document.getElementById("coun");

// Camera functionality
let stream = null;
let capturedFile = null;

// State variable to track what the icon should do
let isCameraOpen = false;

async function openCamera() {
  // Clear previous image
  window.capturedImageData = null;
  capturedFile = null;
  const capturedImage = document.getElementById("capturedImage");
  capturedImage.style.display = "none";
  const spanImage = document.getElementById("spanImage");
  spanImage.textContent = "";
  spanImage.style.display = "none";

  try {
    // Access the user's camera
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.getElementById("video");
    video.srcObject = stream;
    video.style.display = "block";
    document.getElementById("captureIcon").style.display = "block";
    document.getElementById("cameraBtn").style.display = "none";
    // Set icon to capture image
    document.getElementById("captureIcon").onclick = captureImage;
    isCameraOpen = true;
  } catch (err) {
    console.error("Error accessing camera:", err);
    alert(
      "Unable to access the camera. Please ensure you have a camera and permissions are granted."
    );
  }
}

async function captureImage() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const capturedImage = document.getElementById("capturedImage");
  const context = canvas.getContext("2d");

  // Ensure canvas matches the video dimensions
  canvas.width = 220;
  canvas.height = 220;

  // Draw the current video frame on the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert the canvas to an image (base64 string)
  const imageData = canvas.toDataURL("image/png");
  window.capturedImageData = imageData;

  // Convert base64 to File object
  try {
    const res = await fetch(imageData);
    const blob = await res.blob();
    capturedFile = new File([blob], "captured_image.png", {
      type: "image/png",
    });
  } catch (err) {
    console.error("Error converting image to File:", err);
    alert("Failed to process the captured image. Please try again.");
    return;
  }

  // Display the captured image
  capturedImage.src = imageData;
  capturedImage.style.display = "block";

  // Hide the video, keep the icon visible
  video.style.display = "none";
  document.getElementById("captureIcon").style.display = "block"; // Keep icon visible
  // Change icon functionality to open camera again
  document.getElementById("captureIcon").onclick = openCamera;
  isCameraOpen = false;

  // Stop the camera stream
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
}

// Update Validation3 to check if an image is captured and send to backend
async function Validation3() {
  var fnval = fn.value;
  var span6 = document.getElementById("span6");
  if (fnval === "") {
    span6.textContent = "*";
    span6.style.display = "inline";
    fn.value = "";
    fn.style.color = "black";
  } else if (!regexfName.test(fnval)) {
    span6.textContent = "";
    span6.style.display = "inline";
    fn.style.color = "red";
  } else {
    span6.textContent = "";
    span6.style.display = "inline";
    fn.style.color = "black";
    var e = 1;
  }

  var lnval = ln.value;
  var span9 = document.getElementById("span9");
  if (lnval === "") {
    span9.textContent = "*";
    span9.style.display = "inline";
    ln.value = "";
    ln.style.color = "black";
  } else if (!regexlName.test(lnval)) {
    span9.textContent = "";
    span9.style.display = "inline";
    ln.style.color = "red";
  } else {
    ln.style.color = "black";
    span9.textContent = "";
    span9.style.display = "inline";
    var f = 1;
  }

  var emval = em.value;
  var span8 = document.getElementById("span8");
  if (emval === "") {
    span8.textContent = "*";
    span8.style.display = "inline";
    em.value = "";
    em.style.color = "black";
  } else if (!regexemail.test(emval)) {
    span8.textContent = "";
    span8.style.display = "inline";
    em.style.color = "red";
  } else {
    em.style.color = "black";
    span8.textContent = "";
    span8.style.display = "inline";
    var g = 1;
  }

  var phval = ph.value;
  var span7 = document.getElementById("span7");
  if (phval === "") {
    span7.textContent = "*";
    span7.style.display = "inline";
    ph.value = "";
    ph.style.color = "black";
  } else if (!regxphone.test(phval)) {
    span7.textContent = "";
    span7.style.display = "inline";
    ph.style.color = "red";
  } else {
    ph.style.color = "black";
    span7.textContent = "";
    span7.style.display = "inline";
    var h = 1;
  }

  var passval = pass.value;
  var span11 = document.getElementById("span11");
  var span12 = document.getElementById("span12");

  if (passval === "") {
    span11.textContent = "*";
    span11.style.display = "inline";
    pass.value = "";
    pass.style.color = "black";
  } else if (!regxpass.test(passval)) {
    span12.textContent =
      "Invalid Password (must be 8+ chars, include uppercase, number, special char)";
    span11.textContent = "*";
    span11.style.display = "inline";
    pass.style.color = "red";
  } else {
    pass.style.color = "black";
    span11.textContent = "";
    span11.style.display = "inline";
    span12.textContent = "";
    span12.style.display = "inline";
    var i = 1;
  }

  var countryval = country.value;
  var span10 = document.getElementById("span10");
  if (countryval === "") {
    span10.textContent = "*";
    span10.style.display = "inline";
    country.value = "";
    country.style.color = "black";
  } else if (!regxcountry.test(countryval)) {
    span10.textContent = "";
    span10.style.display = "inline";
    country.style.color = "red";
  } else {
    country.style.color = "black";
    span10.textContent = "";
    span10.style.display = "inline";
    var j = 1;
  }

  // Check if an image is captured
  var imageCaptured = capturedFile ? 1 : 0;
  var spanImage = document.getElementById("spanImage");
  if (!imageCaptured) {
    spanImage.textContent = "Please capture an image";
    spanImage.style.display = "inline";
  } else {
    spanImage.textContent = "";
    spanImage.style.display = "none";
  }

  if (
    e == 1 &&
    f == 1 &&
    g == 1 &&
    h == 1 &&
    i == 1 &&
    j == 1 &&
    imageCaptured == 1
  ) {
    // Prepare data for backend
    const formData = new FormData();
    formData.append("firstName", fn.value); // Send firstName separately
    formData.append("lastName", ln.value); // Send lastName separately
    formData.append("userName", country.value); // fullName is the username
    formData.append("Email", em.value); // Capital "E" as expected by backend
    formData.append("Phone", ph.value);
    formData.append("password", pass.value);
    formData.append("profileImg", capturedFile); // Changed from "image" to "profileImg"

    try {
      const response = await fetch("https://mfa-back.vercel.app/auth/signup", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        // // Clear form
        // fn.value = "";
        // ln.value = "";
        // em.value = "";
        // ph.value = "";
        // pass.value = "";
        // country.value = "";
        // document.getElementById("capturedImage").style.display = "none";
        // window.capturedImageData = null;
        // capturedFile = null;
        // document.getElementById("captureIcon").style.display = "block";
        // document.getElementById("captureIcon").onclick = openCamera;

        // Store the token
        if (!result.token) {
          throw new Error("Token not received from the server");
        }
        window.verificationToken = result.token;

        // Show OTP popup
        const otpPopup = document.getElementById("otpPopup");
        const mainContent = document.getElementById("mainContent");

        if (!otpPopup || !mainContent) {
          throw new Error("Failed to find OTP popup or main content elements");
        }

        otpPopup.style.display = "flex";
        mainContent.classList.add("blurred");

        // Add event listeners to OTP inputs for auto-focus
        const otpInputs = document.querySelectorAll(".otp-digit");
        if (otpInputs.length === 0) {
          throw new Error("Failed to find OTP input elements");
        }

        otpInputs.forEach((input, index) => {
          input.addEventListener("input", (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
              otpInputs[index + 1].focus();
            }
          });
          input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && e.target.value === "" && index > 0) {
              otpInputs[index - 1].focus();
            }
          });
        });

        // alert(result.message); // "Verification code sent to your email."
      } else {
        throw new Error(result.message || "Failed to sign up");
      }
    } catch (error) {
      // console.error("Error during signup:", error.message || error);
      // alert(
      //   error.message || "An error occurred while signing up. Please try again."
      // );
    }
  } else {
    // console.log("Validation failed, one or more checks did not pass.");
  }
}

async function verifyOTP() {
  const otpInputs = document.querySelectorAll(".otp-digit");
  const otpError = document.getElementById("otpError");
  const token = window.verificationToken;

  // Combine OTP digits
  const otp = Array.from(otpInputs)
    .map((input) => input.value)
    .join("");

  // Validate OTP length
  if (otp.length !== 6) {
    otpError.textContent = "Please enter a 6-digit OTP";
    otpError.style.display = "block";
    return;
  }

  // Clear any previous error
  otpError.textContent = "";
  otpError.style.display = "none";

  try {
    const response = await fetch(
      "https://mfa-back.vercel.app/auth/verifyEmailUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ code: otp }),
      }
    );

    const result = await response.json();

    if (response.ok && result.status === "success") {
      // Hide OTP popup
      const otpPopup = document.getElementById("otpPopup");
      const mainContent = document.getElementById("mainContent");
      otpPopup.style.display = "none";
      mainContent.classList.remove("blurred");

      // Clear OTP inputs
      otpInputs.forEach((input) => (input.value = ""));

      const username = document.getElementById("coun").value || "User";

      // Set a flag in sessionStorage to clear the form and show Open Camera button when returning
      // Set a flag in sessionStorage to indicate the user is logged in
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", username); // Store username for later use
      sessionStorage.setItem("clearSignUpForm", "true");

      // Clear form
      // fn.value = "";
      // ln.value = "";
      // em.value = "";
      // ph.value = "";
      // pass.value = "";
      // country.value = "";
      // document.getElementById("capturedImage").style.display = "none";
      // window.capturedImageData = null;
      // capturedFile = null;
      // document.getElementById("captureIcon").style.display = "block";
      // document.getElementById("captureIcon").onclick = openCamera;

      // Show success message
      // alert("Account verified successfully! You can now log in.");

      // // Redirect to login page
      // window.location.href = "login.html";

      // Redirect to welcome page with username
      const page = `home1.html?username=${encodeURIComponent(username)}`;
      window.location.href = page;
    } else {
      throw new Error(result.message || "Failed to verify OTP");
    }
  } catch (error) {
    // console.error("Error during OTP verification:", error);S
    otpError.textContent = error.message || "Invalid or expired OTP";
    otpError.style.display = "block";
  }
}

/**/
var regexemaillog = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
var emlog = document.getElementById("emlog");
var regxpasslog = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9])[A-Za-z0-9\W_]{8,}$/;
var passlog = document.getElementById("passlog");

async function Validation4() {
  var emlogval = emlog.value;
  console.log(emlogval);
  var span14 = document.getElementById("span14");
  if (emlogval === "") {
    span14.textContent = "*";
    span14.style.display = "inline";
    emlog.value = "";
    emlog.style.color = "black";
  } else if (!regexemaillog.test(emlogval)) {
    span14.textContent = "";
    emlog.style.color = "red";
  } else {
    emlog.style.color = "black";
    span14.textContent = "";
    span14.style.display = "inline";
    var m = 1;
  }

  var passlogval = passlog.value;
  console.log(passlogval);
  var span15 = document.getElementById("span15");
  if (passlogval === "") {
    span15.textContent = "*";
    span15.style.display = "inline";
    passlog.value = "";
    passlog.style.color = "black";
  } else if (!regxpasslog.test(passlogval)) {
    span15.textContent = "";
    passlog.style.color = "red";
  } else {
    passlog.style.color = "black";
    span15.textContent = "";
    span15.style.display = "inline";
    var n = 1;
  }

  // Check if an image is captured
  var imageCaptured = capturedFile ? 1 : 0;
  var spanImage = document.getElementById("spanImage");
  if (!imageCaptured) {
    spanImage.textContent = "Please capture an image";
    spanImage.style.display = "inline";
  } else {
    spanImage.textContent = "";
    spanImage.style.display = "none";
  }

  if (m === 1 && n === 1 && imageCaptured === 1) {
    const formData = new FormData();
    formData.append("email", emlogval);
    formData.append("password", passlogval);
    formData.append("faceImage", capturedFile);

    try {
      const response = await fetch("https://mfa-back.vercel.app/auth/login", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Result:", result);

      if (response.ok && result.status === "success") {
        window.currentEmail = emlogval;
        document.getElementById("otpPopup").style.display = "flex";
      } else {
        throw new Error(result.message || "Failed to login");
      }
    } catch (error) {
      var span16 = document.getElementById("span16");
      span16.textContent =
        error.message ||
        "An error occurred while logging in. Please try again.";
      span15.style.display = "inline";
    }
  }
}

function moveToNextInput(event, nextInput) {
  const input = event.target;
  if (input.value.length === 1 && nextInput) {
    nextInput.focus();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const otpInputs = document.querySelectorAll(".otp-digit");
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      moveToNextInput(event, otpInputs[index + 1]);
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && input.value === "" && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });
});

async function verifyOTP2() {
  const otpInputs = document.querySelectorAll(".otp-digit");
  const otp = Array.from(otpInputs)
    .map((input) => input.value)
    .join("");
  const email = window.currentEmail;

  if (otp.length !== 6) {
    document.getElementById("otpError").textContent =
      "Please enter a 6-digit OTP";
    document.getElementById("otpError").style.display = "block";
    return;
  }

  try {
    const response = await fetch("https://mfa-back.vercel.app/auth/checkOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: otp, email }),
    });

    const result = await response.json();
    console.log("OTP Verification Result:", result);

    if (response.ok && result.status === "success") {
      const username = result.data.userName || "User";

      // Set a flag in sessionStorage to indicate the user is logged in
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", username); // Store username for later use
      sessionStorage.setItem("clearLoginForm", "true");

      const page = `home1.html`;
      window.location.href = page;

      document.getElementById("otpPopup").style.display = "none";
    } else {
      const otpError = document.getElementById("otpError");
      if (
        result.msg ===
        "Invalid verification code or expired check email to send new otp"
      ) {
        otpError.textContent =
          "Invalid OTP. A new OTP has been sent to your email.";
        otpError.style.display = "block";
        otpInputs.forEach((input) => (input.value = ""));
        otpInputs[0].focus();
      } else if (result.msg === "failed") {
        otpError.textContent = "Too many failed attempts. Please start over.";
        otpError.style.display = "block";
        setTimeout(() => {
          document.getElementById("otpPopup").style.display = "none";
          window.location.reload();
        }, 2000);
      } else {
        otpError.textContent = "An error occurred. Please try again.";
        otpError.style.display = "block";
      }
    }
  } catch (error) {
    document.getElementById("otpError").textContent =
      "An error occurred while verifying OTP. Please try again.";
    document.getElementById("otpError").style.display = "block";
  }
}

////////////////////////

function func1() {
  var ele = document.getElementById("p1");
  ele.style.display = "grid";
  var ele2 = document.getElementById("p2");
  ele2.style.display = "none";
}
function func2() {
  var ele = document.getElementById("p1");
  ele.style.display = "none";
  var ele2 = document.getElementById("p2");
  ele2.style.display = "grid";
}

// function validatePayment() {
//   let cardholder = document.getElementById("cardholder").value;
//   let cardnumber = document.getElementById("cardnumber").value;
//   let expiry = document.getElementById("expiry").value;
//   let cvv = document.getElementById("cvv").value;
//   let valid = true;

//   if (!cardholder) {
//     document.getElementById("cardholder-error").textContent =
//       "Cardholder name is required";
//     valid = false;
//   } else {
//     document.getElementById("cardholder-error").textContent = "";
//   }

//   if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardnumber)) {
//     document.getElementById("cardnumber-error").textContent =
//       "Enter a valid 16-digit card number";
//     valid = false;
//   } else {
//     document.getElementById("cardnumber-error").textContent = "";
//   }

//   if (!/^\d{2}\/\d{2}$/.test(expiry)) {
//     document.getElementById("expiry-error").textContent = "Enter valid MM/YY";
//     valid = false;
//   } else {
//     document.getElementById("expiry-error").textContent = "";
//   }

//   if (!/^\d{3}$/.test(cvv)) {
//     document.getElementById("cvv-error").textContent =
//       "Enter a valid 3-digit CVV";
//     valid = false;
//   } else {
//     document.getElementById("cvv-error").textContent = "";
//   }

//   if (valid) {
//     alert("Payment submitted!");
//   }
// }

// var regexemaillog = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
var regexfrom = /^[a-zA-Z\s]{2,}$/;
var regxto = /^[a-zA-Z\s]{2,}$/;
// var regxpasslog = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9])[A-Za-z0-9\W_]{8,}$/;

function Validation5() {
  var from = document.getElementById("from");
  var fromval = from.value;
  console.log(fromval);
  var span22 = document.getElementById("span22");
  if (fromval === "") {
    span22.textContent = "*";
    span22.style.display = "inline";
    from.style.color = "black";
  } else if (!regexfrom.test(fromval)) {
    span22.textContent = "";
    from.style.color = "red";
  } else {
    from.style.color = "black";
    span22.textContent = "";
    span22.style.display = "inline";
    var mn = 1;
  }
  var to = document.getElementById("to");
  var toval = to.value;
  console.log(toval);
  var span23 = document.getElementById("span23");
  if (toval === "") {
    span23.textContent = "*";
    span23.style.display = "inline";
    to.style.color = "black";
  } else if (!regxto.test(toval)) {
    span23.textContent = "";
    to.style.color = "red";
  } else {
    to.style.color = "black";
    span23.textContent = "";
    span23.style.display = "inline";
    var nm = 1;
  }
  var date2 = document.getElementById("date");
  var span24 = document.getElementById("span24");
  if (!date2.value) {
    span24.textContent = "*";
    span24.style.display = "inline";
  } else {
    span24.textContent = "";
    span24.style.display = "none";
    var lg = 1;
  }
  var time = document.getElementById("time");
  var span25 = document.getElementById("span25");
  if (!time.value) {
    span25.textContent = "*";
    span25.style.display = "inline";
  } else {
    span25.textContent = "";
    span25.style.display = "none";
    var gg = 1;
  }
  if (mn == 1 && nm == 1 && lg == 1 && gg == 1) {
    showPaymentPopup();
  }
}

function test5(e) {
  e.preventDefault();
}
