window.onload = async (event) => {
  const name = document.getElementById("name");
  const username = document.getElementById("username");
  const profile = document.getElementById("profile-pic");
  const bio = document.getElementById("bio");
  const followers = document.getElementById("followers");
  const following = document.getElementById("following");
  const pollscreated = document.getElementById("pollscreated");

  let user = localStorage.getItem("user");
  user = await JSON.parse(user);

  showPage();

  if (user) {
    name.innerText = user.name;
    username.innerText = user.username;
    bio.innerText = user.bio;
    profile.src = user.profilepic;
    followers.innerText = user.followers.length;
    following.innerText = user.following.length;
    pollscreated.innerText = user.pollscreated.length;
    document.getElementsByClassName("avatar")[0].src = user.profilepic;
  } else {
    document.body.innerHTML = `
      <div class="container-fluid align-self-center">
        <div class="h1 text-center">Session Expired. Please <a style="text-decoration:underline" href="../Auth/signin-signup.html">LogIn</a> again.</div>
      </div>`;
  }

  console.log("user:", user);
};

const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "../Auth/signin-signup.html";
});

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("main-content").style.display = "block";
}
