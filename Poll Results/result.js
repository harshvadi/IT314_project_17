google.charts.load("current", { packages: ["corechart"] });

function generatePDF() {
  // Choose the element id which you want to export.
  var element = document.getElementById("divToExport");
  //   element.style.width = "700px";
  //   element.style.height = "900px";
  var opt = {
    margin: 0.3,
    filename: "myfile.pdf",
    image: { type: "png", quality: 1 },
    html2canvas: { scale: 1 },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
      precision: "100",
    },
  };

  // choose the element and pass it to html2pdf() function and call the save() on it to save as pdf.
  html2pdf().set(opt).from(element).save();
}

function generateCsv(filename, csvData) {
  const element = document.createElement("a");

  element.setAttribute("href", `data:text/csv;charset=utf-8,${csvData}`);
  element.setAttribute("download", filename);
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// get poll analytics

async function getResponses(pollid) {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(`${BACKEND_BASE_URL}/api/getdetailsaboutPoll`, {
    method: "POST",
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      pollid: pollid,
    }),
    withCredentials: true, // should be there
    credentials: "include", // should be there
  });
  console.log(response.status);
  const data = await response.json();
  //   console.log(data);

  if (response.status === 200) {
    // console.log(data.pollanalysisobj);

    const questions = document.getElementById("questions");
    const que = data.pollanalysisobj;

    let pollQuestions = [];

    for (let i = 0; i < data.pollanalysisobj.length - 1; i++) {
      questions.innerHTML += `<li class="my-3">${que[i].question.question}</li>`;
      pollQuestions.push(que[i].question.question);

      // text answer
      if (que[i].question.type == "2") {
        const responses = que[i].optionsfrequency;

        let count = 0;
        responses.forEach((response) => {
          questions.innerHTML += `<div class="row text-answer">
                <p>${response}</p>
            </div>`;

          //   count++;

          //   if (count > 1) {
          //     questions.innerHTML += `<div class="row text-center">
          //         <button class="btn btn-link">Show More</button>
          //     </div>`;

          //     break;
          //   }
        });
      }

      // mcq answer
      else {
        const options = que[i].question.options;
        // console.log(options);

        let frequency = [["Option", "Value"]];
        const responses = que[i].optionsfrequency;

        for (let x = 0; x < options.length; x++) {
          if (responses[x]) {
            frequency.push([options[x], responses[x]]);
          } else {
            frequency.push([options[x], 0]);
          }
        }
        // console.log(frequency);

        questions.innerHTML += `<div id="piechart${i}"></div>`;

        google.charts.setOnLoadCallback(drawChart);

        // Draw the chart and set the chart values
        function drawChart() {
          var data = google.visualization.arrayToDataTable(frequency);

          // Optional; add a title and set the width and height of the chart
          var options = { width: 550, height: 400 };

          // Display the chart inside the <div> element with id="piechart"
          var chart = new google.visualization.PieChart(
            document.getElementById(`piechart${i}`)
          );
          chart.draw(data, options);
        }
      }
    }

    // formatting the data for CSV
    console.log(pollQuestions);
    const userResponses = que[que.length - 1].responses;
    console.log(userResponses);

    // csv
    const csvData = [];

    for (let i = 0; i < userResponses.length; i++) {
      let res = {};
      for (let j = 0; j < pollQuestions.length; j++) {
        // console.log(pollQuestions[j]);
        // console.log(userResponses[i][j][0]);

        let que = pollQuestions[j];
        res[que] = userResponses[i][j][0];
      }
      csvData.push(res);
    }

    console.log(csvData);

    const downloadCsv = document.getElementById("csv-btn");

    downloadCsv.addEventListener("click", () => {
      generateCsv("test.csv", json2csv.parse(csvData));
    });
  }
}

getResponses("64440ab912b25cc99d279265");
