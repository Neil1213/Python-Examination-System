let qb = document.getElementsByClassName("questionBank");

//console.log(qb);
fetch("./getQuestions.php")
  .then(res => res.json())
  .then(({ data }) => {
    let buf = ` <table style="width: 516px; height: 35px;">
    <tbody id = "qbank">
    <tr style="height: 23px;">
    <!--<th style="width: 191px; height: 23px;">&nbsp;Question Name</th>-->
    <th style="width: 223px; height: 23px;">Question&nbsp;&nbsp;</th>
    <th style="width: 50px; height: 23px;">&nbsp;Type</th>
    <th style="width: 51px; height: 23px;">&nbsp;Diffculty</th>
    </tr>
   
    `;
    qData = data;
    for (var i = 0; i < data.length; i++) {
      buf += "<tr>";
      let qName = data[i]["Question"];
      let difficulty = data[i]["Difficulty"];
      Id = data[i]["Id"];
      let category = data[i]["Category"];
      buf +=
        "<td>" +
        qName +
        "</td><td>" +
        difficulty +
        "</td><td>" +
        "</td><td>" +
        category +
        "</td>" +
        "<td style='display:none'>" +
        Id +
        "</td>" +
        "<td>" +
        "<input type='checkbox' id='" +
        Id +
        "'name='Questions'>" +
        "</td></tr>";
    }
    buf += " </tbody></table>";
    buf += "<button class='Submit' onclick='makeExam()' type='button'>Add to List</button>"
    qb[0].innerHTML = buf;
    console.log(qb);
  });

function makeExam() {
  let examTable = `<table id = "eTable" style="width: 516px; height: 35px;">
    <tbody id = "qbank">
    <tr style="height: 23px;">
    <th style="width: 223px; height: 23px;">Question&nbsp;&nbsp;</th>
    <th style="width: 50px; height: 23px;">&nbsp;Points</th>
    <th style="width: 50px; height: 23px;">&nbsp; Id </th>
    </tr>`;

  for (var i = 0; i < qData.length; i++) {
    if (document.getElementById(qData[i]["Id"]).checked == true) {
      examTable += `<tr><td>` + qData[i]["Question"] + `</td><td><input class = "points" type = "number"></input>` + `</td><td style='display:none'>` + qData[i]["Id"] + `</td></tr>`;
    }
  }
  examTable += `</tbody></table>`;
  examTable += `<button style='margin-top: 4px;
  align-content: center;
  margin-left: 80px;
  background-color: #2DAD6B;
  opacity: 80;
  border-radius: 6px;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;' onclick = 'sendExam()' type = 'button'> Make Exam</button>`;
  document.getElementsByClassName("column2")[0].innerHTML = examTable;
}

function sendExam() {
  let examTable = document.getElementById("eTable");
  let qPoints = document.getElementsByClassName("points");
  let examData = new FormData(); //outside array
  for (var i = 1; i < examTable.rows.length; i++) {
    let buf = new Array(); // inside array
    let questionID = examTable.rows[i].cells[2].innerHTML;
    let points = qPoints[i - 1].value;
    examData.append(i + '[]', Number(questionID));
    examData.append(i + '[]', Number(points));
    //buf.push(Number(questionID)); 
    //buf.push(Number(points));
    //examData.push(buf);
  }
  console.log(examData);
  fetch("./sendExam.php", {
    method: "POST",
    body: examData,
  });

}

