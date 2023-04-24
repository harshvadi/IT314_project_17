// var $tpl = $('#question').clone();
//   var num = 1

//    $('#clone').click(function () {
//         num++;
//         var $cloned = $tpl.clone();
//         $cloned.attr('id', $tpl.attr('id') + '_' + num);
//         $(':not([id=""])', $cloned).each(function(){
//             $(this).attr('id', $(this).attr('id') + '_'+num); 
//         });
//         $cloned.appendTo('#wrapper');
//     });


// const cloneBtn = document.getElementsById('add-question');
// const elementToClone = document.querySelector('.question');
/*
var i = 0;

function duplicate() {
    var original = document.getElementById('duplicater' + i);
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "duplicater" + ++i; // there can only be one element with an ID
    clone.onclick = duplicate; // event handlers are not cloned
    original.parentNode.appendChild(clone);
}

cloneBtn.addEventListener('click', function()); 
// {
// const clonedElement = elementToClone.cloneNode(true);
// document.body.appendChild(clonedElement);
// };
*/

/*
$(document).on(click,'.btn-copy',function(){
    $(this).parents('.example-1').append($(this).parent().clone());
  });
*/




        // if (type === "text-box"){
        //     // console.log("text");
        //     input.setAttribute("type", "text");
        //     input.setAttribute("class", "answer-box");
        //     input.setAttribute("placeholder", "Answer");
        //     div.appendChild(input);
        //     // console.log(div);
        //     // question.appendChild(div);
        //     // answer.innerHTML = div.innerHTML;
        // }

        // else if (type === "check-box"){
        //     input.setAttribute("type", "checkbox");
        //     input.setAttribute("id", "checkbox-id");
            
        //     const label = document.createElement("label");
        //     label.setAttribute("for", "checkbox-id");
            
        //     const checkboxinput = document.createElement("input");
        //     checkboxinput.setAttribute("type", "text");
        //     checkboxinput.setAttribute("class", "check-box");
        //     checkboxinput.setAttribute("placeholder", "Add Field");
            
        //     const addbutton = document.createElement("button");
        //     addbutton.setAttribute("class", "add-field-button");
        //     // addbutton.setAttribute("value", "Add Field");
        //     // addbutton.appendChild("Add Field");
        //     // input.value = "Add Field";
        //     const addbuttonname = document.createTextNode("Add Field");
        //     addbutton.appendChild(addbuttonname);

        //     const deletebutton = document.createElement("button");
        //     deletebutton.setAttribute("id", "delete-field-button");
        //     deletebutton.setAttribute("value", "Delete Field");
        //     // deletebutton.appendChild("Delete Field");
        //     const deletebuttonname = document.createTextNode("Delete Field");
        //     deletebutton.appendChild(deletebuttonname);
            
        //     label.appendChild(checkboxinput)
        //     div.appendChild(input);
        //     div.appendChild(label);
        //     div.appendChild(addbutton);
        //     div.appendChild(deletebutton);
        //     console.log(div);
        //     // question.appendChild(div);
        // }

        // else if (type === "multiple-choice"){
        //     input.setAttribute("type", "radio");
        //     input.setAttribute("id", "radio-id");
            
        //     const label = document.createElement("label");
        //     label.setAttribute("for", "radio-id");
            
        //     const radioboxinput = document.createElement("input");
        //     radioboxinput.setAttribute("type", "text");
        //     radioboxinput.setAttribute("class", "radio-box");
        //     radioboxinput.setAttribute("placeholder", "Add Field");
            
        //     const addbutton = document.createElement("button");
        //     addbutton.setAttribute("class", "add-field-button");
        //     const addbuttonname = document.createTextNode("Add Field");
        //     addbutton.appendChild(addbuttonname);

        //     const deletebutton = document.createElement("button");
        //     deletebutton.setAttribute("id", "delete-field-button");
        //     deletebutton.setAttribute("value", "Delete Field");
        //     const deletebuttonname = document.createTextNode("Delete Field");
        //     deletebutton.appendChild(deletebuttonname);
            
        //     label.appendChild(radioboxinput)
        //     div.appendChild(input);
        //     div.appendChild(label);
        //     div.appendChild(addbutton);
        //     div.appendChild(deletebutton);
        //     console.log(div);
        //     // question.appendChild(div);
        // }
 
        // else if (type === "file-upload"){
        //     const label = document.createElement("label");
        //     label.setAttribute("for", "file");
        //     label.setAttribute("class", "file-input-text")
        //     const labelname = document.createTextNode("Select a file to upload");
            
        //     input.setAttribute("type", "file");
        //     input.setAttribute("class", "file-input");
        //     input.setAttribute("id", "file");

        //     label.appendChild(labelname)
        //     div.appendChild(label);
        //     div.appendChild(input);
        //     // question.appendChild(div);
        // }
 
        // else if (type === "date-box"){
        //     input.setAttribute("type", "date");
        //     input.setAttribute("class", "input-date");
        //     input.setAttribute("id", "date");

        //     div.appendChild(input);
        //     // question.appendChild(div);
        // }
 
        // else if (type === "time-box"){
        //     input.setAttribute("type", "time");
        //     input.setAttribute("class", "input-time");
        //     input.setAttribute("id", "time");

        //     div.appendChild(input);
        //     // question.appendChild(div);
        // }

        // answer.innerHTML = div.innerHTML;

        // const div = document.createElement("div");
        // div.setAttribute("class", "question");

        // const question = document.createElement("input");
        // question.setAttribute("type", "text");
        // question.setAttribute("class", "question-box");
        // question.setAttribute("placeholder", "Question");
        
        // const select = document.createElement("select");
        // select.setAttribute("class", "answer-type");
        
        // const v1 = document.createElement("option");
        // v1.setAttribute("value", "text-box");
        // const v1t = document.createTextNode("Text Box")
        // v1.appendChild(v1t);
        // select.appendChild(v1);
 
        // const v2 = document.createElement("option");
        // v2.setAttribute("value", "check-box");
        // const v2t = document.createTextNode("Check Box")
        // v2.appendChild(v2t);
        // select.appendChild(v2);
 
        // const v3 = document.createElement("option");
        // v3.setAttribute("value", "multiple-choice");
        // const v3t = document.createTextNode("Multiple Choice")
        // v3.appendChild(v3t);
        // select.appendChild(v3);
 
        // const v4 = document.createElement("option");
        // v4.setAttribute("value", "file-upload");
        // const v4t = document.createTextNode("Upload File")
        // v4.appendChild(v4t);
        // select.appendChild(v4);
 
        // const v5 = document.createElement("option");
        // v5.setAttribute("value", "date-box");
        // const v5t = document.createTextNode("Date")
        // v5.appendChild(v5t);
        // select.appendChild(v5);
 
        // const v6 = document.createElement("option");
        // v6.setAttribute("value", "time-box");
        // const v6t = document.createTextNode("Time")
        // v6.appendChild(v6t);
        // select.appendChild(v6);

        // const divans = document.createElement("div");
        // divans.setAttribute("class", "answer");

        // div.appendChild(question);
        // div.appendChild(select);
        // div.appendChild(divans);

        // console.log(div)
        // mainform.appendChild(div);
 
    })
  });
  
  // $(document).ready(function(){
      
  
  //     $('.delete-question').click(function(e){
  //         e.preventDefault(); 
  //         $(this).parent().parent().empty();
  //     })
  
  //     $('.add-field-button').click(function(){
  //         console.log("add");
  //         // const div = document.createElement("div")
  //         // const input = document.createElement("input");
  //         // input.setAttribute("type", "radio");
  //         //     input.setAttribute("id", "radio-id");
              
  //         //     const label = document.createElement("label");
  //         //     label.setAttribute("for", "radio-id");
              
  //         //     const radioboxinput = document.createElement("input");
  //         //     radioboxinput.setAttribute("type", "text");
  //         //     radioboxinput.setAttribute("class", "radio-box");
  //         //     radioboxinput.setAttribute("placeholder", "Add Field");
              
  //         //     const addbutton = document.createElement("button");
  //         //     addbutton.setAttribute("class", "add-field-button");
  //         //     const addbuttonname = document.createTextNode("Add Field");
  //         //     addbutton.appendChild(addbuttonname);
  
  //         //     const deletebutton = document.createElement("button");
  //         //     deletebutton.setAttribute("id", "delete-field-button");
  //         //     deletebutton.setAttribute("value", "Delete Field");
  //         //     const deletebuttonname = document.createTextNode("Delete Field");
  //         //     deletebutton.appendChild(deletebuttonname);
              
  //         //     label.appendChild(radioboxinput)
  //         //     div.appendChild(input);
  //         //     div.appendChild(label);
  //         //     div.appendChild(addbutton);
  //         //     div.appendChild(deletebutton);
  //         //     console.log(div);
  //         //     question.appendChild(div);
  
  //     });
  
  //     // const answertype = document.getElementById('.answer-type')
  //     // console.log(answertype)
  //     // answertype.addEventListener("click", function(){
  //     //     const type = answertype.value 
  //     //     console.log(type)
  //     // });
  
  // });
  
  
  
  // // document.addEventListener("DOMContentLoaded", function() { 
  // //     const answertype = document.querySelector('.answer-type')
  // //     console.log(answertype)
  // //     answertype.addEventListener("click", function(){
  // //         const type = answertype.value 
  // //         console.log(type)
  // //     });
  // // });
  
  // // window.onload=function(){
  // //     const answertype = document.querySelector('.answer-type')
  // //     console.log(answertype)
  // //     answertype.addEventListener("click", function(){
  // //         const type = answertype.value 
  // //         console.log(type)
  // //     });
  // // }