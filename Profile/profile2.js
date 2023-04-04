function profile() {
  document.getElementsByClassName("current")[0].classList.remove("current");
  document.getElementsByClassName("profile")[0].classList.add("current");
}

function surveys() {
  document.getElementsByClassName("current")[0].classList.remove("current");
  document.getElementsByClassName("surveys")[0].classList.add("current");
}

function contributions() {
  document.getElementsByClassName("current")[0].classList.remove("current");
  document.getElementsByClassName("contributions")[0].classList.add("current");
}

window.onload = async (event) => {
  const name = document.getElementById("name");
  const username = document.getElementById("username");
  const profile = document.getElementById("profile-pic");
  const bio = document.getElementById("bio");

  let user = localStorage.getItem("user");
  user = await JSON.parse(user);

  if (user) {
    name.innerText = user.name;
    username.innerText = user.username;
    bio.innerText = user.bio;
    profile.src = user.profilepic;
    document.getElementsByClassName("avatar")[0].src = user.profilepic;
  } else {
    document.body.innerHTML = `
      <div class="container-fluid align-self-center">
        <div class="h1 text-center">Session Expired. Please <a style="text-decoration:underline" href="../Auth/signin-signup.html">LogIn</a> again.</div>
      </div>`;
  }

  console.log("user:", user);
};
