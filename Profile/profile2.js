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

function follower_openModal() {
  document.getElementById('followers-popup').style.display = 'block';
}

function following_openModal() {
  document.getElementById('followings-popup').style.display = 'block';
}

const limitthevisibilitychar = (count, id) => {
  const cnt = document.getElementById(id).innerText;
  if (cnt.length > count) {
    const idcontainer = document.getElementById(id);
    idcontainer.innerText = cnt.slice(0, count) + "...";
  }
}

// followers

limitthevisibilitychar(15, "suggest-user1");
limitthevisibilitychar(15, "suggest-user2");
limitthevisibilitychar(15, "suggest-user3");
limitthevisibilitychar(15, "suggest-user4");
limitthevisibilitychar(15, "suggest-user5");


// followings
limitthevisibilitychar(15, "suggest-user6");
limitthevisibilitychar(15, "suggest-user7");
limitthevisibilitychar(15, "suggest-user8");
limitthevisibilitychar(15, "suggest-user9");
limitthevisibilitychar(15, "suggest-user10");

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
