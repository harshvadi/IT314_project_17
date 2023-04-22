google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Task", "Hours per Day"],
    ["Work", 8],
    ["Eat", 2],
    ["TV", 4],
    ["Gym", 2],
    ["Sleep", 8],
  ]);

  // Optional; add a title and set the width and height of the chart
  var options = { width: 550, height: 400 };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}

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

// csv
const data = [
  {
    que1: "de86e2",
    que2: "dcode",
    que3: 36,
  },
  {
    que1: "aa11b4",
    que2: "code.slayer1",
    que3: 24,
  },
  {
    que1: "be45dd",
    que2: "javascriptking",
    que3: 42,
  },
];

function generateCsv(filename, csvData) {
  const element = document.createElement("a");

  element.setAttribute("href", `data:text/csv;charset=utf-8,${csvData}`);
  element.setAttribute("download", filename);
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

const downloadCsv = document.getElementById("csv-btn");

downloadCsv.addEventListener("click", () => {
  generateCsv("test.csv", json2csv.parse(data));
});
