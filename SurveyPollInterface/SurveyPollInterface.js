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



let questionCount = 0; // Keep track of the number of questions added

function addQuestion() {
    questionCount++;

    const questionsContainer = document.getElementById('main-form');

    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
        <input type="text" class="question-box" name="question${questionCount}" placeholder="Question">

        <select class="answer-type" name="answerType${questionCount}" onchange="showAnswerOptions(this)">
            <option value="null">--Select--</option>
            <option value="text-box">Text Box</option>
            <option value="check-box">Check Box</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="file-upload">Upload File</option>
            <option value="date-box">Date</option>
            <option value="time-box">Time</option>
        </select>

        <div class="answer" style="display: none;">
            <div class="text-box" style="display: none;">
                <input type="text" name="answerOptions${questionCount}" class="answer-box" placeholder="Answer">
            </div>

            <div class="check-box" style="display: none;">
                <input type="checkbox" id="checkbox-id" name="answerOptions${questionCount}">
                <label for="checkbox-id"><input type="text" class="multiple-box" placeholder="Add Field"></label>
                <button id="add-field-button">Add Field</button>
                <button id="delete-field-button">Delete Field</button>
            </div>

            <div class="multiple-choice" style="display: none;">
                <input type="radio" id="radio-id" name="answerOptions${questionCount}">
                <label for="radio-id"><input type="text" class="radio-box" placeholder="Add Field"></label>
                <button id="add-field-button">Add Field</button>
                <button id="delete-field-button">Delete Field</button>
            </div>

            <div class="file-upload" style="display: none;">
                <label for="file" class="file-input-text">Select a file to upload</label>
                <input type="file" class="file-input" id="file" name="answerOptions${questionCount}">
            </div>

            <div class="date-box" style="display: none;">
                <input type="date" class="input-date" id="date" name="answerOptions${questionCount}">
            </div>

            <div class="time-box" style="display: none;">
                <input type="time" class="input-time" id="time" name="answerOptions${questionCount}">
            </div>
        </div>

        <button type="button" class="delete-question" onclick="deleteQuestion(this) ">Delete</button>
    `;

    questionsContainer.appendChild(questionDiv);
}

function showAnswerOptions(select) {
    const questionDiv = select.parentNode;
    const answerOptionsDiv = questionDiv.querySelector('.answer');

    answerOptionsDiv.querySelector('.text-box').style.display = 'none';
    answerOptionsDiv.querySelector('.check-box').style.display = 'none';
    answerOptionsDiv.querySelector('.multiple-choice').style.display = 'none';
    answerOptionsDiv.querySelector('.file-upload').style.display = 'none';
    answerOptionsDiv.querySelector('.date-box').style.display = 'none';
    answerOptionsDiv.querySelector('.time-box').style.display = 'none';


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

    else if (select.value === 'file-upload'){
        answerOptionsDiv.style.display = 'block';
        const ans = answerOptionsDiv.querySelector('.file-upload');
        ans.style.display = 'block';
    }

    else if (select.value === 'date-box'){
        answerOptionsDiv.style.display = 'block';
        const ans = answerOptionsDiv.querySelector('.date-box');
        ans.style.display = 'block';
    }

    else if (select.value === 'time-box'){
        answerOptionsDiv.style.display = 'block';
        const ans = answerOptionsDiv.querySelector('.time-box');
        ans.style.display = 'block';
    }

    else {
        answerOptionsDiv.style.display = 'none';
    }

}

function deleteQuestion(button) {
    const questionDiv = button.parentNode;
    questionDiv.parentNode.removeChild(questionDiv);
}

document.getElementById('questionForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Handle form submission logic here
    // Access the questions and their answer types and values using the form elements
});
