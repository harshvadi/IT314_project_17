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
    document.getElementsByClassName(
      "polls"
    )[0].innerHTML = `<h1 class="text-center">No polls created.</h1>`;
  }

  let i = 1;
  polls.forEach(async (poll) => {
    // console.log(poll);
    const pollResponses = await getResponses(poll._id);
    // console.log(pollResponses);

    document.getElementsByClassName(
      "polls"
    )[0].innerHTML += `<div class="row text-center poll">
    <div class="col">
      ${i}. ${poll.title}
    </div>
    <div class="col">
      ${pollResponses}
    </div>
    <div class="col">
    <i class="fa fa-external-link" id = "${poll._id}" onclick="getDetailsAboutPoll(this.id)"></i>
    </div>
  </div>

  <hr>`;
    i++;
  });
}

window.onload = async () => {
  getAllpolls();
};

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
  window.location.href = "../Poll Results/result.html";
};
