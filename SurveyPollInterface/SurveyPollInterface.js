window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});


let questionCount = 0; // Keep track of the number of questions added
let i=0;
const main = document.getElementById('main');
const mainDiv = document.createElement('div');
mainDiv.className = 'main-div';

const questionsContainer = document.getElementById('question');
const answersContainer = document.getElementById('answer');
const mainContainer = document.getElementById('main');

const mailformcontainer = document.getElementById('main-form')
// const newsurvey = new FormData(mailformcontainer);
function addQuestion() {
    questionCount = questionCount + 1;
    let onebox = document.createElement('div');
    onebox.innerHTML = `<div class="main-form" id="newquestion${questionCount}" >
    <div class="mb-3">
        <div class="firstcol1">
        <label for="exampleFormControlTextarea${questionCount}" class="form-label">Add Question</label>
        <select class="form-select select1" name="type${questionCount}" id="newquestionselect${questionCount}" aria-label="Default select example">
            <option disabled>Question type</option>
            <option selected value="2">Text</option>
            <option value="1">Options</option>
          </select>
        </div>
        <br>
        <textarea name="question${questionCount}" class="form-control textarea-harsh-style" style="width: 98%;max-width: 98%;" id="exampleFormControlTextarea${questionCount}" rows="3"></textarea>
    </div>
</div>`;
    mailformcontainer.appendChild(onebox);
}

let response;

mailformcontainer.addEventListener('change', function (e) {
    // save form data to localstorage

    response = new FormData(mailformcontainer);
    response = [...response.entries()];

    // console.log(response)

    let survey = [];

    let i=0;
    let data = {}
    response.forEach((item) => {
        if(i==0) {
            data["type"] = item[1];
            i=1;
        } else {
            data["question"] = item[1];
            survey.push(data);
            data = {};
            i=0;
        }
        // console.log(item[1]);
    })

    console.log(survey);
    localStorage.setItem('survey', JSON.stringify(survey));
});
// https://quickpolls-2zqu.onrender.com
const sendSurveyData = async (obj) => {
    const token = localStorage.getItem('token');
    const response = await fetch('https://quickpolls-2zqu.onrender.com/api/createpoll', {
        method: "POST",
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token,
            title: obj.title,
            description: obj.description,
            userid: obj.userid,
            questions: obj.questions,
            endedAt: obj.endedAt,
            isprivate: obj.isprivate
        }),
        withCredentials: true, // should be there
        credentials: "include", // should be there
    });

    console.log(response);
    return response;

}

document.getElementById('btn-submit').addEventListener('click', async function (event) {
    event.preventDefault();

    /*  get meta data*/
    const obj = {};
    const title = document.getElementById('surveytitle').value;
    const description = document.getElementById('surveydesc').value;
    const userid = JSON.parse(localStorage.getItem('user'))._id;
    obj['title'] = title;
    obj['description'] = description;
    obj['userid'] = userid;
    const questions = JSON.parse(localStorage.getItem('survey'));
    console.log(questions);

    let surveyObj = [];
    if(questions == null) {
        alert("Please add questions");
        return;
    }
    questions.forEach((question) => {
        let queObj = {}
        // mcq
        if(question.type == "1") {
            let x = question.question.split('\n');
            let que = x[0];
            let options = [];

            for(let i=1;i<x.length;i++) {
                options.push(x[i]);
            }
            if(options.length == 0){
                alert("Please add options");
                return;
            }
            
            queObj["question"] = que;
            queObj["type"] = "1";
            queObj["options"] = options;
        } else {
            let x = question.question.split('\n');
            let que = x[0];
            queObj["question"] = que;
            queObj["type"] = "2";
        }

        surveyObj.push(queObj);
    });

    const enddateofsurvey = document.getElementById('enddateofsurvey').value;
    const private_checkbox = document.getElementById('private-checkbox').checked;
    console.log(enddateofsurvey);
    obj['questions'] = surveyObj;
    obj['endedAt'] = enddateofsurvey;
    obj['isprivate'] = private_checkbox;
    console.log(obj);
    const response = await sendSurveyData(obj);
    const data = await response.json();
    if(response.status == 200) {
        // alert(data.message);
        prompt("Copy the link", data.pollurl);
        localStorage.removeItem('survey');
        window.location.href = '../Feed/Feed.html';

    }else{
        alert(data.message);
    }

});


const btn_cancel = document.getElementById('btn-cancel');
btn_cancel.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../Feed/Feed.html';
}
);