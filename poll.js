async function getPoll(poll_id) {
  const response = await fetch(
    `${BACKEND_BASE_URL}/api/getpoll/6432b58da4c6a433ba2c61ea`,
    {
      method: "POST",
      headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      withCredentials: true, // should be there
      credentials: "include", // should be there
    }
  );
  console.log(response.status);

  // if poll not found, return false
  if (response.status !== 200) {
    document.body.innerHTML = `<h1 class="error" style="color: red; text-align: center; margin-top: 10%">Oops! Invalid Poll</h1>`;
    return false;
  }

  // if poll already responded, return false
  if (localStorage.getItem("pollsTaken")) {
    let pollsTaken = JSON.parse(localStorage.getItem("pollsTaken"));

    pollsTaken.forEach((poll) => {
      if (localStorage.getItem("poll_id") == poll) {
        document.body.innerHTML = `<h1 class="error" style="color: blue; text-align: center; margin-top: 10%">You've already responded this poll.</h1>`;
        return false;
      }
    });
  }

  const data = await response.json();

  const poll = data.pollobject;
  console.log(poll);

  const questions = poll.questions;
  console.log(questions);

  document.getElementById("title").innerHTML = poll.title;
  document.getElementById("description").innerHTML = poll.description;

  const pollForm = document.getElementById("poll");

  questions.forEach((que) => {
    let question = `<li>${que.question}</li>`;

    // mcq
    if (que.type == "1") {
      const options = que.options;

      let i = 0;
      options.forEach((option) => {
        question += `<input type="radio" id="${i}" name="${que.questionid}" value=${option}>
            <label for=${option}>${option}</label><br>`;
      });
    }

    // text
    else {
      question += `<input type="text" name="${que.questionid}">`;
    }

    pollForm.innerHTML += question;
  });

  pollForm.innerHTML += `<br>
  <div class="foot">
  <input type="submit" class="submit-poll-page"></div>`;
  return true;
}

window.onload = () => {
  const url = window.location.href;
  urlArray = url.split("/");
  const poll_id = urlArray[urlArray.length - 1];
  //   localStorage.setItem("poll_id", poll_id);
  localStorage.setItem("poll_id", "6432b58da4c6a433ba2c61ea");
  if (getPoll(poll_id)) {
    const pollForm = document.getElementById("poll");

    pollForm.addEventListener("change", () => {
      document.getElementById("error").innerHTML = "";
    });

    pollForm.addEventListener("submit", (event) => {
      event.preventDefault();

      var response = new FormData(pollForm);
      const values = [...response.entries()];

      var res = [];
      values.forEach((value) => {
        var data = {
          questionid: value[0],
          questionresponse: [value[1]],
        };
        res.push(data);
      });
      console.log(res);
      submitResponse(res);
    });
  }
};

async function submitResponse(res) {
  const poll_id = localStorage.getItem("poll_id");
  console.log(poll_id);

  let userid;
  if (localStorage.getItem("user")) {
    userid = localStorage.getItem("user")._id;
  }

  const response = await fetch(`${BACKEND_BASE_URL}/api/takeresponse`, {
    method: "POST",
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pollid: poll_id,
      userid: userid,
      responses: res,
    }),
    withCredentials: true, // should be there
    credentials: "include", // should be there
  });
  console.log(response.status);

  if (response.status === 200) {
    document.body.innerHTML = `<h1 class="success" style="color: green; text-align: center; margin-top: 10%">Thanks for submitting the poll.</h1>`;
  } else {
    document.getElementById("error").innerHTML =
      "Please answer all the questions";

    return;
  }

  const data = await response.json();
  console.log(data.message);

  if (localStorage.getItem("pollsTaken")) {
    let pollsTaken = JSON.parse(localStorage.getItem("pollsTaken"));
    pollsTaken.push(poll_id);
  } else {
    localStorage.setItem("pollsTaken", JSON.stringify([poll_id]));
  }
}
