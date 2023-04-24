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

    let mainform = document.body.querySelector('.main-form')
    let question = document.body.querySelector('.question');

    $('.answer-type').change(function () {
        const type = $(this).prop('value')
        console.log(type)
        console.log(this.parentElement.querySelector('.answer'))

        let answerContent = ``;
        // const div = document.createElement("div")
        // const input = document.createElement("input");
        // const answer = document.body.querySelector('.answer');

        if (type === "text-box") {
            // console.log('text box');
            answerContent = `<input type="text" class="answer-box" placeholder="Answer">`
        }

        // $(this).parentElement.querySelector('.answer').innerHTML = answerContent;

    });

    $('#add-question').click(function () {
        var questionContent = `  <div class="question">

        <input type="text" class="question-box" placeholder="Question">

        <select class="answer-type">
            <option selected>--Select--</option>
            <option value="text-box">Text Box</option>
            <option value="check-box">Check Box</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="file-upload">Upload File</option>
            <option value="date-box">Date</option>
            <option value="time-box">Time</option>
        </select>

        <i class="fa-solid fa-trash"></i>

        <div class="answer"></div>
        
        </div>`

        mainform.innerHTML += questionContent;

    });
});
