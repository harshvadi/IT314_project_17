const signUpButton = document.getElementById("signup");
const signUpHomeButton = document.getElementById("signup-home");
const signInButton = document.getElementById("signIn");
const signInHomeButton = document.getElementById("signin-home");
const container = document.getElementById("container");
const bck = document.getElementById("back");

const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll("form .next-btn");
const prevBtn = document.querySelectorAll("form .previous-btn");
const form = document.querySelector("form");
const loginForm = document.getElementById("login-form");

nextBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("next");
  });
});

prevBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("prev");
    document.getElementById("error-message2").innerHTML = "";
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
  form.reset();
});

// signUpButton.addEventListener('click', () => {
// 	window.location.href = '../Profile/profile.html';profil
// });

signInHomeButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
  form.reset();
  document.getElementById("email").value = "";
});

// signInButton.addEventListener("click", () => {
//   window.location.href = "../Profile/profile.html";
// });

bck.addEventListener("click", () => {
  window.location.href = "../index.html";
});

//--------------------------------signin.js--------------------------------------------

const Login = async (email, password) => {
  // api call to locahost:3000/api/auth/login
  const response = await fetch(
    "https://quickpolls-2zqu.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      withCredentials: true, // should be there
      credentials: "include", // should be there
    }
  );
  console.log(response.status);
  const data = await response.json();
  console.log(data);
  if (data.message) {
    console.log("login successful");
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;
    if (role == "admin") {
      window.location.href = "../Admin/Admin.html";
    } else {
      window.location.href = "../Feed/feed.html";
    }
  } else {
    let errormessage;
    if (data.message) {
      errormessage = data.errormessage;
    } else {
      errormessage = data.error;
    }

    document.getElementById("error-message").innerHTML = errormessage;
    return errormessage;
  }
  return true;
};

console.log("hello");

// const loginForm = document.getElementById('login-form');  // get the login form ???
// loginForm.onload = () => {
//   form.reset();
// };

// window.onload = () => {
//   form.reset();
// };

loginForm.addEventListener("submit", async (e) => {
  // event listener for the login form
  e.preventDefault();
  console.log("Start");
  console.log("login form submitted");
  // e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email) {
    document.getElementById("error-message").innerHTML =
      "Please enter your email";
    return false;
  } else if (!password) {
    document.getElementById("error-message").innerHTML =
      "Please enter your password";
    return false;
  }

  if (!email.includes("@") && !email.includes(".")) {
    document.getElementById("error-message").innerHTML =
      "Please enter a valid email";
    return false;
  }

  const issuccessfull = await Login(email, password);

  if (!issuccessfull) {
    return false;
  }

  // get local storage and get the role

  console.log("login successful");
  document.getElementById("signin-home").innerText = "Log in";
});

//--------------------------------signup.js--------------------------------------------
// 
const Signup = async (firstname, email, username, password) => {
  // api call to locahost:3000/api/auth/register
  console.log(firstname, email, username, password);
  const response = await fetch(
    "https://quickpolls-2zqu.onrender.com/api/auth/register",
    {
      method: "POST",
      headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: firstname,
        email,
        username,
        password,
      }),
      withCredentials: true, // should be there
      credentials: "include", // should be there
    }
  );

  const data = await response.json();
  console.log(data);
  const statuscode = response.status;
  if (statuscode == 200) {
    console.log("Signup successful");
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
    form.reset();
    window.location.href = "../Feed/feed.html";
  } else {
    document.getElementById("error-message2").innerHTML = data.message;
    return false;
  }
  return true;
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
  const firstname = document.getElementById("name").value;
  const email = document.getElementById("email2").value;
  const username = document.getElementById("username").value;
//   const role = document.getElementById("role").value;
  const password = document.getElementById("password1").value;
  const confirm_password = document.getElementById("password2").value;

  if (!firstname || !email || !username || !password || !confirm_password) {
    // check all fields
    console.log(firstname, email, username, password, confirm_password);
    document.getElementById("error-message2").innerHTML =
      "Please enter all the fields";
    console.log("Please enter all the fields");
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    // check email
    document.getElementById("error-message2").innerHTML =
      "Please enter a valid email";
    console.log("Please enter all the fields");
    return;
  }
  // compare passwords
  if (password != confirm_password) {
    document.getElementById("error-message2").innerHTML =
      "The passwords you entered do not match";
    return;
  }
  console.log("begin signup");
  let signupsuccess = await Signup(firstname, email, username, password);
  if (!signupsuccess) {
    return false;
  }

  /////////////////////////////////////////////////////////////////////////
  // access cookie from the api cookie section
  // const cookie = document.cookie;
  // console.log(cookie.jwt);
  /////////////////////////////////////////////////////////////////////////

  console.log("Signup successful");
  document.getElementById("signup-home").innerText = "Sign up";
});
