window.onload = async (event) => {
  // const name = document.getElementById("name");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const bio = document.getElementById("bio");

  let user = localStorage.getItem("user");
  user = await JSON.parse(user);

  if (user) {
    name.value = user.name;
    username.value = user.username;
    bio.value = user.bio;
    email.value = user.email;
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

  // const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;

  const res = await updateProfile(username, email, bio);
});

const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "../Auth/signin-signup.html";
});

async function updateProfile(username, email, bio) {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch(
    `${BACKEND_BASE_URL}/api/updateProfile/${user._id}`,
    {
      method: "PUT",
      headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        currUser: {
          // name: name,
          username: username,
          email: email,
          bio: bio,
        },
      }),
      withCredentials: true, // should be there
      credentials: "include", // should be there
    }
  );
  console.log(response.status);

  if (response.status === 200) {
    const user = JSON.parse(localStorage.getItem("user"));
    user.username = username;
    user.email = email;
    user.bio = bio;

    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("message").innerHTML =
      "Profile updated successfully";
  }
}
