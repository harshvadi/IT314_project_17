window.onload = async (event) => {
  const name = document.getElementById("name");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const bio = document.getElementById("bio");
  const instagram = document.getElementById("instagram");
  const facebook = document.getElementById("facebook");
  const twitter = document.getElementById("twitter");

  let user = localStorage.getItem("user");
  user = await JSON.parse(user);

  if (user) {
    name.value = user.name;
    username.value = user.username;
    bio.value = user.bio;
    email.value = user.email;
    instagram.value = user.instagram;
    facebook.value = user.facebook;
    twitter.value = user.twitter;
    document.getElementsByClassName("avatar")[0].src = user.profilepic;
  } else {
    document.body.innerHTML = `
        <div class="container-fluid align-self-center">
          <div class="h1 text-center">Session Expired. Please <a style="text-decoration:underline" href="../Auth/signin-signup.html">LogIn</a> again.</div>
        </div>`;
  }

  console.log("user:", user);
};

editForm = document.getElementById("edit-form");
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;
  const instragram = document.getElementById("instagram").value;
  const facebook = document.getElementById("facebook").value;
  const twitter = document.getElementById("twitter").value;


  const res = await updateProfile(name, username, email, bio, instragram, facebook, twitter);
});

const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "../Auth/signin-signup.html";
});

//https://quickpolls-2zqu.onrender.com/api/updateProfile/${user._id}
async function updateProfile(name, username, email, bio, instragram, facebook, twitter) {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch(
    `http://localhost:3000/api/updateProfile/${user._id}`,
    {
      method: "PUT",
      headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        currUser: {
          name: name,
          username: username,
          email: email,
          bio: bio,
          instragram: instragram,
          facebook: facebook,
          twitter: twitter,
        },
      }),
      withCredentials: true, // should be there
      credentials: "include", // should be there
    }
  );
  console.log(response.status);

  if (response.status === 200) {
    const user = JSON.parse(localStorage.getItem("user"));
    user.name = name;
    user.username = username;
    user.email = email;
    user.bio = bio;
    user.instagram = instragram;
    user.facebook = facebook;
    user.twitter = twitter;

    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("message").innerHTML =
      "Profile updated successfully";

    setTimeout(() => {
      window.location.href = "./profile2.html";
    }, 2000);
  }
}

function cancelEdit() {
  window.location.href = "./profile2.html";
}
