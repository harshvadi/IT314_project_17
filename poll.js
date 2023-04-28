let queType = [];
let poll;
let currentUser = "";
let isuserexist = localStorage.getItem("user");
if (isuserexist && JSON.parse(localStorage.getItem("user"))._id) {
  currentUser = JSON.parse(localStorage.getItem("user"))._id;
}

const disableloader = () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
};
async function getPoll(poll_id) {
  const response = await fetch(
    `https://it314g17backend-production.up.railway.app/api/getpoll/${poll_id}`,
    {
      method: "POST",
      headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser: currentUser,
      }),
      withCredentials: true, // should be there
      credentials: "include", // should be there
    }
  );
  console.log(response);

  // if poll not found, return false
  if (
    response.status !== 200 &&
    response.status !== 406 &&
    response.status !== 403
  ) {
    document.body.innerHTML = `<h1 class="error" style="color: red; text-align: center; margin-top: 10%">Oops! Invalid Poll</h1>`;
    return false;
  } else if (response.status == 406) {
    document.body.innerHTML = `<h1 class="error" style="color: red; text-align: center; margin-top: 10%">Sorry! Poll has ended</h1>`;
    return false;
  } else if (response.status == 403) {
    document.body.innerHTML = `<h1 class="error" style="color: red; text-align: center; margin-top: 10%">Sorry! Poll is private</h1>`;
    return false;
  }

  const data = await response.json();
  disableloader();
  const displaycontent = document.getElementById("showafterload");
  displaycontent.style.display = "block";

  poll = data.pollobject;
  console.log(poll);

  const questions = poll.questions;
  console.log(questions);

  document.getElementById("title").innerHTML = poll.title;
  document.title = poll.title;
  document.getElementById("description").innerHTML = poll.description;

  const pollForm = document.getElementById("poll");

  questions.forEach((que) => {
    let question = `<li>${que.question}</li>`;

    // mcq
    if (que.type == "1") {
      queType.push("1");
      const options = que.options;

      let i = 0;
      options.forEach((option) => {
        question += `<input type="radio" id="${option}" name="${que.questionid}" value=${i}>
            <label for=${option}>${option}</label><br>`;
        i++;
      });
    }

    // text
    else {
      queType.push("2");
      question += `<textarea type="text" name="${que.questionid}" style="min-width: 43vw; min-height: 10vh; padding: 10px; font-weight: 200; font-size: 20px; margin-left: 20px">`;
    }

    pollForm.innerHTML += question;
  });

  pollForm.innerHTML += `<br>
  <div class="foot">
  <input type="submit" class="submit-poll-page" id="submitPoll"></div>`;
  // console.log(document.getElementById("submitPoll").innerHTML);
  return true;
}

window.onload = () => {
  const url = window.location.href;
  urlArray = url.split("=");
  const poll_id = urlArray[urlArray.length - 1];
  // localStorage.setItem("poll_id", poll_id);
  // clear non-whitespace characters
  // poll_id.replace(/\s/g, "");
  console.log(poll_id);

  if (localStorage.getItem("pollsTaken") != null) {
    const pollsTaken = JSON.parse(localStorage.getItem("pollsTaken"));
    // console.log("pollsTaken");
    pollsTaken.forEach((poll) => {
      if (poll == poll_id) {
        console.log("poll already taken");
        document.body.innerHTML = `<div class="text-center"><h1 class="error" style="color: blue; text-align: center; margin-top: 10%">You've already responded this poll.</h1><h2><a href="./Feed/feed.html">Create your own poll</a></h2></div>`;
        return;
      }
    });
    console.log("fetch poll");
  }

  console.log("fetching poll...");
  getPoll(poll_id);
  const pollForm = document.getElementById("poll");

  pollForm.addEventListener("submit", async (event) => {
    document.getElementById("submitPoll").disabled = true;
    event.preventDefault();

    var response = new FormData(pollForm);
    const values = [...response.entries()];
    console.log(values);

    if (poll.questions.length !== values.length) {
      alert("Please answer all the questions");
      return;
    }

    var res = [];
    let i = 0;
    values.forEach((value) => {
      var data = {
        questionid: value[0],
        questionresponse: [value[1]],
        type: queType[i],
      };
      res.push(data);
      i++;
    });
    console.log(res);
    await submitResponse(res);
  });

  return;
};
// poll_id_local = JSON.parse(poll_id_local);
// if (poll_id_local.length === 24) {
//   localStorage.setItem("pollsTaken", JSON.stringify([poll_id]));
// }

// console.log(poll_id);
// for (let i = 0; i < poll_id_local.length; i++) {
//   let redirectpage = "./index.html";

//   if (localStorage.getItem("user")) {
//     redirectpage = "./Feed/feed.html";

//     setTimeout(function () {
//       window.close();
//     }, 3000);
//   }
//   if (poll_id_local[i] == poll_id) {
//     document.body.innerHTML = `<div class="text-center"><h1 class="error" style="color: blue; text-align: center; margin-top: 10%">You've already responded this poll.</h1><h2><a href=${redirectpage}>Create your own poll</a></h2></div>`;
//     return false;
//   } else {
//     console.log("here");
//   }
// }

// if (localStorage.getItem("pollsTaken")) {
//   if (localStorage.getItem("pollsTaken").length === 24) {
//     localStorage.removeItem("pollsTaken");
//     localStorage.setItem("pollsTaken", JSON.stringify([poll_id]));
//   }
//   let pollsTaken = JSON.parse(localStorage.getItem("pollsTaken"));

//   pollsTaken.forEach((poll) => {
//     if (poll == poll_id) {
//       let redirectpage = "./index.html";
//       if (localStorage.getItem("user")) {
//         redirectpage = "./Feed/feed.html";
//       }
//       document.body.innerHTML = `<div class="text-center"><h1 class="error" style="color: blue; text-align: center; margin-top: 10%">You've already responded this poll</h1><h2><a href=${redirectpage}>Create your own poll</a></h2></div>`;

//       return false;
//     }
//   });
// }

async function submitResponse(res) {
  // const poll_id = localStorage.getItem("poll_id");
  // console.log("here");
  // console.log(poll_id);
  // if(poll_id){

  //   return;
  // }

  const url = window.location.href;
  urlArray = url.split("=");
  const poll_id = urlArray[urlArray.length - 1];

  // const poll_id_locals = localStorage.getItem("pollsTaken");
  // for (let i = 0; i < poll_id_locals.length; i++) {
  //   let redirectpage = "./index.html";
  //   if (localStorage.getItem("user")) {
  //     redirectpage = "./Feed/feed.html";
  //   }
  //   if (poll_id_locals[i] == poll_id) {
  //     document.body.innerHTML = `<div class="text-center"><h1 class="error" style="color: blue; text-align: center; margin-top: 10%">You've already responded this poll.3</h1><h2><a href=${redirectpage}>Create your own poll</a></h2></div>`;
  //     return;
  //   }
  // }

  if (localStorage.getItem("pollsTaken")) {
    let pollsTaken = JSON.parse(localStorage.getItem("pollsTaken"));
    pollsTaken.push(poll_id);
    console.log("pollsTaken here");
    localStorage.setItem("pollsTaken", JSON.stringify(pollsTaken));
  } else {
    localStorage.setItem("pollsTaken", JSON.stringify([poll_id]));
  }

  let userid;
  if (localStorage.getItem("user")) {
    userid = JSON.parse(localStorage.getItem("user"))._id;
  }
  console.log(userid);
  // https://quickpolls-2zqu.onrender.com
  const response = await fetch(
    "https://quickpolls-2zqu.onrender.com/api/takeresponse",
    {
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
    }
  );
  console.log(response.status);

  if (response.status === 200) {
    let redirectpage = "./index.html";
    if (localStorage.getItem("user")) {
      redirectpage = "./Feed/feed.html";
    }
    document.body.innerHTML = `<div class="text-center"><h1 class="error" style="color: blue; text-align: center; margin-top: 10%">Your response has been recorded successfully.</h1><h2><a href=${redirectpage}>Create your own poll</a></h2></div>`;
  } else {
    alert("Please answer all the questions");
    // document.getElementById("error").innerHTML =
    //   "Please answer all the questions";

    return;
  }

  const data = await response.json();
  console.log(data.message);

  // if (localStorage.getItem("pollsTaken")) {
  //   let pollsTaken = JSON.parse(localStorage.getItem("pollsTaken"));
  //   pollsTaken.push(poll_id);
  //   console.log("pollsTaken here2");
  //   localStorage.setItem("pollsTaken", JSON.stringify(pollsTaken));
  // } else {
  //   localStorage.setItem("pollsTaken", JSON.stringify([poll_id]));
  // }
}
