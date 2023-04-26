/*!
* Start Bootstrap - Scrolling Nav v5.0.6 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
// 

{/* <script src="https://ajax.googleapis.com/ajax/libsjquery/1.11jquery.mins.js"></script> */ }


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

const container = document.getElementById("input-cont");
function addInput() {
    // document.getElementById("remove-opt").style.display = "inline-block";
  
    const input = document.createElement('input');
    input.classList.add("input-field");
    input.placeholder = "Option";
    // input.placeholder = 'Option ' + (i + 1);
    
    console.log(container);
    questionsContainer.appendChild(input);
    i++;
  }

  function removeInput() {
    // while (i > 0) {
      questionsContainer.removeChild(questionsContainer.lastChild);
    //   i--;
  
      if (i == 0) {
        document.getElementById("remove-opt").style.display = "none";
        // success_msg.style.display = "none";
      }
    // }
  }


let questionCount = 0; // Keep track of the number of questions added
let i=0;
const main = document.getElementById('main');
const mainDiv = document.createElement('div');
mainDiv.className = 'main-div';

const questionsContainer = document.getElementById('question');
const answersContainer = document.getElementById('answer');
const mainContainer = document.getElementById('main');

function addQuestion() {
    questionCount++;

    const questionDiv = document.createElement('div');

    
    questionDiv.className = 'question-div';
    questionDiv.innerHTML = `
        <div class="question-number">Question</div>
        <input type="text" class="question-box" name="question${questionCount}" placeholder="Question">

        <select class="answer-type" name="answerType${questionCount}" id="answer-type${questionCount}" onchange="addAnswer(this)">
            <option value="null">--Select--</option>
            <option value="text-box">Text Box</option>
            <option value="check-box">Check Box</option>
            <option value="multiple-choice">Multiple Choice</option>
        </select>

        
            `;
    // if(i%2==0)
        questionsContainer.appendChild(questionDiv);
    // else
    //     questionsContainer.insertBefore(questionDiv,questionsContainer.firstChild);
    console.log(questionDiv.innerHTML);
    // mainContainer.appendChild(questionDiv);
}



function addAnswer(){
    const answerDiv = document.createElement('div');
    let selectElement = document.querySelector(`#answer-type${questionCount}`);
    let output = selectElement.value;
    console.log(output);

    answerDiv.className = 'answer-div';

    if(output === 'text-box'){
        answerDiv.innerHTML = `
        <div class="text-box" style="display": none;">
        </div>

        
        <button type="button" class="delete-question" onclick="deleteQuestion(this)">Delete Question</button>
        `;
    }
    else if(output === 'check-box'){
    answerDiv.innerHTML = `
            
            <button id="add-opt" onclick="addInput()">Add Option</button>
            <button id="remove-opt" onclick="removeInput()">Delete Option</button>

            
        <button type="button" class="delete-question" onclick="deleteQuestion(this)">Delete Question</button>
            `;
    }
    else if(output === 'multiple-choice'){
        answerDiv.innerHTML = `
        
            <button id="add-opt" onclick="addInput()">Add Option</button>
            <button id="remove-opt" onclick="removeInput()">Delete Option</button>
            

        <button type="button" class="delete-question" onclick="deleteQuestion(this)">Delete Question</button>
    `;
    }
   
    console.log(answerDiv.innerHTML);
    // mainContainer.appendChild(answerDiv);
    // answersContainer.innerHTML += answerDiv.innerHTML;
    questionsContainer.appendChild(answerDiv);
}




function showAnswerOptions(select) {
    const questionDiv = select.parentNode;
    const answerOptionsDiv = questionDiv.querySelector('.answer');
    answerOptionsDiv.querySelector('.text-box').style.display = 'none';
    answerOptionsDiv.querySelector('.check-box').style.display = 'none';
    answerOptionsDiv.querySelector('.multiple-choice').style.display = 'none';


    if (select.value === 'null'){
        answerOptionsDiv.style.display = 'none';
    }

    else if (select.value === 'text-box'){
        answerOptionsDiv.style.display = 'block';
        const ans = answerOptionsDiv.querySelector('.text-box');
        ans.style.display = 'block';
    }

    else if (select.value === 'check-box'){
        answerOptionsDiv.style.display = 'block';
        const ans = answerOptionsDiv.querySelector('.check-box');
        ans.style.display = 'block';
    }

    else if (select.value === 'multiple-choice'){
        answerOptionsDiv.style.display = 'block';
        const ans = answerOptionsDiv.querySelector('.multiple-choice');
        ans.style.display = 'block';
    }

    else {
        answerOptionsDiv.style.display = 'none';
    }

}

function deleteQuestion(button) {
    const questionDiv = button.parentNode;
    console.log(i);
    while(i>-2){
        questionsContainer.removeChild(questionsContainer.firstChild);
        i--;
    }
    questionCount--;
}

document.getElementById('questionForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Handle form submission logic here
    // Access the questions and their answer types and values using the form elements
});
