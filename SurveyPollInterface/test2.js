
let data = [
]

const loadForm = () => {
    let mainForm = '';

    data.forEach((item) => {
        mainForm += `
        <div class="question">

        <input type="text" class="question-box" placeholder="Question">

        <select class="answer-type">
            <option value="text" selected>Text Box</option>
            <option value="checkbox">Check Box</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="file">Upload File</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
        </select>

        <i class="fa-solid fa-trash"></i>

        <div class="answer">
            <input type="${item.inputType}" class="answer-box" placeholder="Answer">
        </div>
        
        </div>`
    })

    document.querySelector('.main-form').innerHTML = mainForm;
}

document.querySelector('#add-question').addEventListener('click', () => {
    data.push({
        inputType:'text-box',
        inputVal:"lorem epsum"
    })
    
    loadForm();

    document.querySelectorAll('select').forEach((item, key1) => {
        console.log(item)
        console.log(key1);
        item.addEventListener('change', (event) => {
            console.log(item, data)
            data[key1].inputType = item.type
            loadForm()
        })
    })
})

document.querySelectorAll('select').forEach((item, key1) => {
    console.log(item)
    console.log(key1);
    item.addEventListener('change', (event) => {
        console.log(item, data)
        data[key1].inputType = item.type
        loadForm()
    })
})




