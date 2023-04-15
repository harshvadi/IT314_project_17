const options = document.querySelectorAll('input[name="poll-option"]');
const bars = document.querySelectorAll('.bar');

options.forEach((option, index) => {
  option.addEventListener('click', () => {
    const total = options.length;
    const count = Array.from(options).filter((o) => o.checked).length;
    const percentage = (count / total) * 100;

    bars[index].style.width = `${percentage}%`;
  });
});


// / limit the word count by 6 words only in the div id=trending-poll-name

const limitthevisibitywords = (count, id) => {
  console.log(id)
  const cnt = document.getElementById(id).innerText;
  let words = cnt.split(" ");
  if (words.length > count) {
    const idcontainer = document.getElementById(id);
    idcontainer.innerText = words.slice(0, 6).join(" ") + "...";
  }
}

const limitthevisibilitychar = (count, id) => {
  const cnt = document.getElementById(id).innerText;
  if (cnt.length > count) {
    const idcontainer = document.getElementById(id);
    idcontainer.innerText = cnt.slice(0, count) + "...";
  }
}


limitthevisibitywords(6, "trending-poll-name");
limitthevisibilitychar(15, "suggest-user1");
limitthevisibilitychar(15, "suggest-user2");
limitthevisibilitychar(15, "suggest-user3");
limitthevisibilitychar(15, "suggest-user4");
limitthevisibilitychar(15, "suggest-user5");

const clickopenresponse1 = document.getElementById("open-poll-response-page1");
const clickopenresponse2 = document.getElementById("open-poll-response-page2");
const clickopenresponse3 = document.getElementById("open-poll-response-page3");
const clickopenresponse4 = document.getElementById("open-poll-response-page4");
const clickopenresponse5 = document.getElementById("open-poll-response-page5");
const clickopenresponse6 = document.getElementById("open-poll-response-page6");

const openPollResponsePage = () => {
  window.location.href = "../poll.html";
}

clickopenresponse1.addEventListener("click", openPollResponsePage);
clickopenresponse2.addEventListener("click", openPollResponsePage);
clickopenresponse3.addEventListener("click", openPollResponsePage);
clickopenresponse4.addEventListener("click", openPollResponsePage);
clickopenresponse5.addEventListener("click", openPollResponsePage);
// clickopenresponse6.addEventListener("click", openPollResponsePage);

const options_list = document.querySelectorAll("label");
for (let i = 0; i < options_list.length; i++) {
  options_list[i].addEventListener("click", () => {
    for (let j = 0; j < options_list.length; j++) {
      if (options_list[j].classList.contains("selected")) {
        options_list[j].classList.remove("selected");
      }
    }


    options_list[i].classList.add("selected");
    for (let k = 0; k < options_list.length; k++) {
      options_list[k].classList.add("selectall");
    }

    let forVal = options_list[i].getAttribute("for");
    let selectInput = document.querySelector("#" + forVal);
    let getAtt = selectInput.getAttribute("type");
    if (getAtt == "checkbox") {
      selectInput.setAttribute("type", "radio");
    } else if (selectInput.checked == true) {
      options_list[i].classList.remove("selected");
      selectInput.setAttribute("type", "checkbox");
    }

    let array = [];
    for (let l = 0; l < options_list.length; l++) {
      if (options_list[l].classList.contains("selected")) {
        array.push(l);
      }
    }
    if (array.length == 0) {
      for (let m = 0; m < options_list.length; m++) {
        options_list[m].removeAttribute("class");
      }
    }
  });
}


