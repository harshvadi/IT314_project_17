const options = document.querySelectorAll('input[name="poll-option"]');
const bars = document.querySelectorAll(".bar");
const container = document.getElementById("input-cont");

// Call addInput() function on button click

const create_poll = document.getElementById("create-poll");
const submit_btn = document.getElementById("submit-poll");
const success_msg = document.getElementById("success-msg");

let poll;

let i = 0;
function addInput() {
  document.getElementById("remove-opt").style.display = "inline-block";
  document.getElementById("submit-poll").style.display = "block";

  let input = document.createElement("input");
  input.classList.add("input-field");
  // console.log(input);
  input.placeholder = "Option " + (i + 1);
  container.appendChild(input);
  i++;
}

submit_btn.addEventListener("click", function () {
  // console.log("called")
  // success_msg.style.display = "block";
  success_msg.innerHTML = "Poll Created Successfully";
  // Set a timeout to close the modal after 5 seconds
  setTimeout(closeModal, 2000);
});

if (i == 0) {
  document.getElementById("remove-opt").style.display = "none";
  document.getElementById("submit-poll").style.display = "none";
  // success_msg.style.display = "none";
  success_msg.innerHTML = "";
}

function removeInput() {
  if (i > 0) {
    container.removeChild(container.lastChild);
    i--;

    if (i == 0) {
      document.getElementById("remove-opt").style.display = "none";
      document.getElementById("submit-poll").style.display = "none";
      // success_msg.style.display = "none";
      success_msg.innerHTML = "";
    }
  }
}

function closeModal() {
  // success_msg.style.display = "none";
  success_msg.innerHTML = "";
  document.getElementById("poll-popup").style.display = "none";
  while (i--) {
    container.removeChild(container.lastChild);
  }
  i++;
}

let j = 1;
function openModal() {
  document.getElementById("question").value = "";
  document.getElementById("remove-opt").style.display = "none";
  document.getElementById("submit-poll").style.display = "none";
  success_msg.innerHTML = "";
  // for (j = 1; j <= i; j++) {
  // document.getElementById("input-field"+j).value = "";
  // }
  document.getElementById("poll-popup").style.display = "block";
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("feedismine").style.display = "block";
}

options.forEach((option, index) => {
  option.addEventListener("click", () => {
    const total = options.length;
    const count = Array.from(options).filter((o) => o.checked).length;
    const percentage = (count / total) * 100;

    bars[index].style.width = `${percentage}%`;
  });
});

// / limit the word count by 6 words only in the div id=trending-poll-name

const limitthevisibitywords = (count, id) => {
  // console.log(id)
  const cnt = document.getElementById(id).innerText;
  let words = cnt.split(" ");
  if (words.length > count) {
    const idcontainer = document.getElementById(id);
    idcontainer.innerText = words.slice(0, 6).join(" ") + "...";
  }
};

const limitthevisibilitychar = (count, id) => {
  const cnt = document.getElementById(id).innerText;
  if (cnt.length > count) {
    const idcontainer = document.getElementById(id);
    idcontainer.innerText = cnt.slice(0, count) + "...";
  }
};

limitthevisibitywords(6, "trending-poll-name1");
limitthevisibitywords(6, "trending-poll-name2");
limitthevisibitywords(6, "trending-poll-name3");
limitthevisibitywords(6, "trending-poll-name4");
limitthevisibitywords(6, "trending-poll-name5");

limitthevisibilitychar(15, "suggest-user1");
limitthevisibilitychar(15, "suggest-user2");
limitthevisibilitychar(15, "suggest-user3");
limitthevisibilitychar(15, "suggest-user4");
limitthevisibilitychar(15, "suggest-user5");

const clickopenresponse1 = document.getElementById("open-poll-response-page");

const redirecttohostpoll = document.getElementsByClassName(
  "submit-button-setting"
);

// const redirecttohostpoll.addEventListener('click', () => {

// });

/****** API integrations babyyy */

// on reaching the bottom of the page, load more polls

const getmorepolls = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const response = await fetch(
    "https://quickpolls-2zqu.onrender.com/api/feed/1",
    {
      method: "POST",
      headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
      withCredentials: true, // should be there
      credentials: "include", // should be there
    }
  );
  const data = await response.json();
  showPage();
  return data;
};

const loadMorePolls = async () => {
  let pagecount = localStorage.getItem("pagecount") | 0;
  localStorage.setItem("pagecount", pagecount + 1);
  let feeditems = await getmorepolls();
  if (!feeditems) {
    alert("No more polls to load");
    return;
  }
  feeditems = feeditems.feedItems;
  console.log(feeditems);
  for (let i = 0; i < feeditems.length; i++) {
    const users_name = feeditems[i].name;
    const users_username = feeditems[i].username;
    const profileimg = feeditems[i].profilepic;
    const questiontitle = feeditems[i].pollTitle;
    const question = feeditems[i].question;
    const questiondesc = feeditems[i].pollDescription;
    const totalquestions = feeditems[i].totalquestions;
    const totalresponses = feeditems[i].totalresponses;
    const endedAt = feeditems[i].endedAt;
    let iscontributedisabled = "none";
    if (feeditems[i].questionType == "multiple") {
      iscontributedisabled = "block";
    }

    if (iscontributedisabled == "block") {
      const newitemcontainer = `
            <div class="center-feed-poll-item" id=${pagecount * 10 + i}>
            <div class="feed-center-title-bar-1">
                <div class="feed-center-title-bar">
                    <img src=${profileimg} class="user-profile-img-1" alt="profileimg">
                    <div class="feed-center-title-user-info">
                        <p id="feed-user-info-name">${users_name}</p>
                        <p id="feed-user-info-username">@${users_username}</p>
                    </div>
                </div>
                <div class="submit-btn-contain">
                    <a class="submit-button-setting" target="_blank" href="../poll.html" id="open-poll-response-page${
                      pagecount * 10 + i
                    }" style="display:${iscontributedisabled}">Contribute</a>
                </div>
            </div>
            <hr/>
            
            <div class="feed-center-poll-question">
                <p id="question-title-center-feed">${
                  question && question.length > 0 ? question : questiontitle
                }</p>
                <p class="poll-question-desc">
                    ${questiondesc}
                </p>
                <div class="side-info-question-feed">
                    <div>
                        <span>Questions : <span>${totalquestions}</span></span>
                    </div>
                    <div>
                        <span>Responses : <span>${totalresponses}</span></span>
                    </div>
                    <div>
                        <span>Due : <span>${endedAt}</span></span>
                    </div>
                    
                </div>
            </div>

        </div>
            `;
      // console.log("item");
      const feed = document.getElementById("feedismine");
      feed.innerHTML += newitemcontainer;
    } else {
      // generate labels for options
      poll = {
        question: feeditems[i].question,
        answers: feeditems[i].options,
        answerweight: [40, 10, 10, 25, 15],
        pollcount: 100,
        selectanswer: -1,
      };
      let polldom = {
        question: document.querySelector(".poll .question"),
        answers: document.querySelector(".poll .answers"),
      };
      console.log(poll.answers);
      polldom.question = poll.question;
      polldom.answers = poll.answers
        .map(function (answer, i) {
          return `
        <div class="answer" onclick="markanswer('${i}')">
        ${answer}
        <span class="percentage_bar"></span>
        <span class="percentage_value"></span>
        </div>
        `;
        })
        .join("");

      // console.log(options);

      const users_name = feeditems[i].name;
      const users_username = feeditems[i].username;
      const profileimg = feeditems[i].profilepic;
      const questiontitle = feeditems[i].pollTitle;
      const question = feeditems[i].question;
      const questiondesc = feeditems[i].pollDescription;

      const newitemcontainer = `
            <div class="center-feed-poll-item">
                <div class="feed-center-title-bar-1">
                    <div class="feed-center-title-bar">
                        <img src=${profileimg} class="user-profile-img-1" alt="profileimg">
                        <div class="feed-center-title-user-info">
                            <p id="feed-user-info-name">${users_name}</p>
                            <p id="feed-user-info-username">@${users_username}</p>
                        </div>
                    </div>
                    <div class="submit-btn-contain">
                        <!-- <button class="submit-button-setting" id="open-poll-response-page6">Contribute</button> -->
                    </div>
                </div>
                <hr/>

                <div class="feed-center-poll-question">
                    <!-- <p id="question-title-center-feed">${question}</p>
                    // <div class="poll-center-options"> -->
                    <div class="poll">
                      <div class="question">${polldom.question}</div>
                      <div class="answers">${polldom.answers}</div>
                    </div>
                </div>

            </div>
            `;
      // console.log(newitemcontainer)
      const feed = document.getElementById("feedismine");
      feed.innerHTML += newitemcontainer;
    }
  }
};

function markanswer(i) {
  poll.selectanswer = +i;
  try {
    document
      .querySelector(".poll .answers .answer.selected")
      .classList.remove(".selected");
  } catch (msg) {}

  document
    .querySelectorAll(".poll .answers .answer")
    [+i].classList.add(".selected");

  showresults();
}

function showresults() {
  let answers = document.querySelectorAll(".poll .answers .answer");

  for (let x = 0; x < answers.length; x++) {
    let percentage = 0;
    if (x == poll.selectanswer) {
      percentage = (
        ((poll.answerweight[x] + 1) * 100) /
        (poll.pollcount + 1)
      ).toFixed(2);
    } else {
      percentage = (
        (poll.answerweight[x] * 100) /
        (poll.pollcount + 1)
      ).toFixed(2);
    }

    if (percentage == 0)
      answers[x].querySelector(".percentage_value").innerText = "0%";
    answers[x].querySelector(".percentage_bar").style.width = percentage + "%";
    answers[x].querySelector(".percentage_value").innerText = percentage + "%";
  }
}

// wait 5sec before loading more polls

loadMorePolls();

window.addEventListener("scroll", loadMorePolls);

window.onload = function () {
  // clear pagecount  to zero
  pagecount = 0;
  localStorage.setItem("pagecount", pagecount);
  const user = localStorage.getItem("user");
  if (user) {
    // const "{"_id":"642cb294f2c39fd0f2543008","username":"harshmp","email":"harshlove@gmail.com","role":"Customer","name":"Harsh Prajapati","bio":"Just started surveying.","profilepic":"https://www.w3schools.com/w3images/avatar2.png","__v":0}"
    const userobj = JSON.parse(user);
    const profileimg = userobj.profilepic;
    const username = userobj.username;
    const name = userobj.name;
    const bio = userobj.bio;
    const email = userobj.email;

    let obj = `<div class="left-top-color-grid">
                
    </div>
    <div class="left-top-container-bar">
        <img src=${profileimg} class="over-the-bar-img left-top-container-bar-img" alt="profileimg">
        <div class="content-box">
            <p style="font-size: 18px; font-weight: 700">${name}</p>
            <p class="shadow-color" style="font-size: 14px;">@${username}</p>
            <hr>
            <p>Followings</p>
            <p style="font-size: 14px;">142</p>
            <hr>
            <p>Followers</p>
            <p style="font-size: 14px;">432</p>
            <hr>
            <a class="like-p" href="../Profile/profile2.html" style="cursor:pointer;">View Profile</a>
        </div>
    </div>`;

    const lefttop = document.getElementsByClassName("left-top-container")[0];
    lefttop.innerHTML = obj;
  }
};
