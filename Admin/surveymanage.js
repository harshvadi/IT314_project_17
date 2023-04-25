const clickone_btn_11 = document.getElementById("active-hover-sidebar-11");
const clickone_btn_22 = document.getElementById("active-hover-sidebar-22");
const clickone_btn_33 = document.getElementById("active-hover-sidebar-33");

clickone_btn_11.style.backgroundColor = "none";
clickone_btn_22.style.backgroundColor = "none";

clickone_btn_11.addEventListener("click", () => {
  console.log("clicked");
  window.location.href = "http://localhost:5500/admin/admin.html";
});

clickone_btn_33.addEventListener("click", () => {
  console.log("clicked");
  console.log("already on this");
});

clickone_btn_22.addEventListener("click", () => {
  console.log("clicked");
  window.location.href = "http://localhost:5500/admin/adminmanage.html";
});

const loadAdmininfo = (admin_info) => {
  const firstbox = document.getElementById("item1-first");
  const secondbox = document.getElementById("item2-second");
  const thirdbox = document.getElementById("item3-third");

  firstbox.innerText = admin_info.first;
  secondbox.innerText = admin_info.second;
  thirdbox.innerText = admin_info.third;
};

window.addEventListener("load", function () {
  const admin_info = JSON.parse(localStorage.getItem("admin-info"));
  if (!admin_info) {
    // this.window,location.href = "http://localhost:5500/admin/admin.html";
    return;
  }
  loadAdmininfo(admin_info);
});

const surveymanage_input = document.getElementById("surveymanage-input");
const sumbitform = document.getElementById("getuserinfo");

sumbitform.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("hereh");
  // get last info from the url by splitting it
  const pollid = document
    .getElementById("surveymanage-input")
    .value.split("/")
    .pop();
  console.log(pollid);
  const response = await fetch(
    "https://quickpolls-2zqu.onrender.com/api/getallpolls",
    {
      method: "POST",
      headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pollid: pollid,
        token: localStorage.getItem("token"),
      }),
    }
  );
  if (response.status === 200) {
    data = await response.json();
    data = data.data;
    const userinfo = document.getElementById("user-info");
    userinfo.innerHTML = `
    <div class="mycon1" ><table class="table">
        <thead class="table-secondary">
          <tr>
            <th scope="col">Creator ID</th>
            <th scope="col">Username</th>
            <th scope="col">Name</th>
            <th scope="col">Poll Title</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>${data[1].creator}</td>
                <td>${data[0].username}</td>
                <td>${data[0].name}</td>
                <td>${data[1].title}</td>
            </tr>
        </tbody>
      </table>
      <div class="container text-center">
        <div class="row">
            <div class="col md-1">
                <button class="btn btn-danger" id="${pollid}" onclick="deletePoll(this.id)">Delete</button>
            </div>
            <div class="col md-1">
                <button class="btn btn-success" id="${pollid}" onclick="promotePoll(this.id)">Promote</button>
            </div>
        </div>
      </div>
    </div>`;
  } else {
    alert("Poll not found");
  }
});

async function deletePoll(pollid) {
  const response = await fetch(
    "https://quickpolls-2zqu.onrender.com/api/removepoll",
    {
      method: "POST",
      headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pollid: pollid,
        token: localStorage.getItem("token"),
      }),
    }
  );

  console.log("asdsad");

  console.log(response.status);

  if (response.status == 200) {
    alert("Poll deleted successfully");
    window.location.reload();
  } else {
    alert("Error");
  }
}

async function promotePoll(pollid) {
  const response = await fetch(
    "https://quickpolls-2zqu.onrender.com/api/updatepromoted",
    {
      method: "POST",
      headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pollid: pollid,
        token: localStorage.getItem("token"),
      }),
    }
  );

  if (response.status == 200) {
    alert("Poll promoted successfully");
    window.location.reload();
  } else {
    alert("Error promoting poll");
  }
}
