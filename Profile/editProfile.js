window.onload = async (event) => {
  const name = document.getElementById("name");
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
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;

  console.log(name, username, email, bio);
});
