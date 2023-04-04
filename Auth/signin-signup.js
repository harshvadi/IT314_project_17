const signUpButton = document.getElementById("signup");
const signUpHomeButton = document.getElementById("signup-home");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll("form .next-btn");
const prevBtn = document.querySelectorAll("form .previous-btn");
const form = document.querySelector("form");

nextBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("next");
  });
});

prevBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("prev");
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = [];
  form.querySelectorAll("input").forEach((input) => {
    const { name, value } = input;
    inputs.push({ name, value });
  });
  console.log(inputs);
  //   form.reset();
});

function changeStep(btn) {
  let index = 0;
  const active = document.querySelector(".active");
  index = steps.indexOf(active);
  steps[index].classList.remove("active");
  if (btn === "next") {
    index++;
  } else if (btn === "prev") {
    index--;
  }
  steps[index].classList.add("active");
}

signUpHomeButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

// signUpButton.addEventListener("click", () => {
//   window.location.href = "../Profile/profile.html";
// });

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const Signup = async (name, email, username, role, password) => {
  // api call to locahost:3000/api/auth/register
  const response = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      username,
      role,
      password,
    }),
    withCredentials: true, // should be there
    credentials: "include", // should be there
  });
  const data = await response.json();
  console.log(data);
  if (data) {
    console.log("Signup successful");
    window.location.href = "../Profile/profile2.html";
  } else {
    document.getElementById("error-message").innerHTML = data.message;
  }
};
console.log("signup.js loaded");
const signupForm = document.getElementById("signup-form"); // get the signup form ???
console.log("signup.js loaded");
signupForm.addEventListener("submit", async (e) => {
  // event listener for the signup form
  e.preventDefault();
  console.log("signup.js loaded");
  // document.getElementById('error-message').innerHTML = '';
  // document.getElementById('signup-button').innerText = 'Signing up...';
  // console.log('Signup form submitted');
  // e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("username").value;
  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;

  console.log(name, email, password, confirm_password);

  if (!name || !email || !username || !password || !confirm_password) {
    // check all fields
    document.getElementById("error-message").innerHTML =
      "Please enter all the fields";
    console.log("Please enter all the fields");
    return;
  }
  if (!email.includes("@")) {
    // check email
    document.getElementById("error-message").innerHTML =
      "Please enter a valid email";
    console.log("Please enter all the fields");
    return;
  }
  // compare passwords
  if (password != confirm_password) {
    document.getElementById("error-message").innerHTML =
      "The passwords you entered do not match";
    return;
  }
  console.log("begin signup");
  await Signup(name, email, username, role, password);

  /////////////////////////////////////////////////////////////////////////
  // access cookie from the api cookie section
  // const cookie = document.cookie;
  // console.log(cookie.jwt);
  /////////////////////////////////////////////////////////////////////////

  console.log("Signup successful");
  document.getElementById("signup-button").innerText = "Sign up";
});
