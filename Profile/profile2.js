window.onload = async (event) => {
  getAllpolls();

  const name = document.getElementById("name");
  const username = document.getElementById("username");
  const profile = document.getElementById("profile-pic");
  const bio = document.getElementById("bio");
  const followers = document.getElementById("community-followers");
  const following = document.getElementById("community-following");
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
  document.getElementById("followers-popup").style.display = "block";
}

function following_openModal() {
  document.getElementById("followings-popup").style.display = "block";
}

const limitthevisibilitychar = (count, id) => {
  const cnt = document.getElementById(id).innerText;
  if (cnt.length > count) {
    const idcontainer = document.getElementById(id);
    idcontainer.innerText = cnt.slice(0, count) + "...";
  }
};

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

// displaying user polls
async function getAllpolls() {
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("user")).username;
  const response = await fetch(`${BACKEND_BASE_URL}/api/getallpollsbyuser`, {
    method: "POST",
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      username: username,
    }),
    withCredentials: true, // should be there
    credentials: "include", // should be there
  });
  console.log(response.status);
  const data = await response.json();

  const polls = data.polls;

  if (polls.length == 0) {
    document.getElementById(
      "surveys"
    ).innerHTML += `<h4 class="text-center my-3">No surveys or polls created.</h4>`;
  }

  let i = 1;
  polls.forEach(async (poll) => {
    // console.log(poll);
    const pollResponses = await getResponses(poll._id);
    // console.log(pollResponses);

    document.getElementsByClassName(
      "polls"
    )[0].innerHTML += `<div class="col poll d-flex justify-content-center">
    <div class="card" style="width: 18rem;">
      <div class="card-body" style = "display: flex; flex-direction: column; justify-content: space-evenly">
        <h5 class="card-title">${poll.title}</h5>
        <p class="card-text">${poll.description}</p>
        <p class="card-text"><b>Responses: </b>${pollResponses}</p>
        <button class="btn btn-primary card-btn" id="${poll._id}" onclick="getDetailsAboutPoll(this.id)">See Details</button>
      </div>
    </div>
  </div>`;
    i++;
  });
}

async function getResponses(pollid) {
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("user")).username;
  const response = await fetch(`${BACKEND_BASE_URL}/api/getdetailsaboutPoll`, {
    method: "POST",
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      pollid: pollid,
    }),
    withCredentials: true, // should be there
    credentials: "include", // should be there
  });
  console.log(response.status);
  const data = await response.json();
  //   console.log(data);

  if (response.status === 200) {
    return data.pollanalysisobj[data.pollanalysisobj.length - 1].responses
      .length;
  } else {
    return 0;
  }
}

const getDetailsAboutPoll = (pollid) => {
  localStorage.setItem("poll_details", JSON.stringify(pollid));
  window.open("../Poll Results/result.html", "_blank");
};
