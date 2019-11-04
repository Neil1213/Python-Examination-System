examStore = document.getElementsByClassName("examHolder");

function listExams() {
  fetch("./getExam.php?auth=student&request=takeExam")
    .then(res => res.json())
    .then(({ data }) => {
      var i = 0;
      let buf = "";
      while (i < data.length) {
        buf +=
          "<div><input class='examButtons' type='button' value='Exam  " +
          data[i] +
          "'onclick='takeExam()' id = '" +
          data[i] +
          "'></div>";
        i++;
      }
      examStore[0].innerHTML = buf;
    });
}

function takeExam() {
  let exams = document.getElementsByClassName("examButtons");
  //.querySelectorAll("div");
  let numExams = exams.length;
  //alert(numExams);
  for (var i = 0; i <= numExams; i += 1) {
    exams[i].onclick = function (e) {
      examID = this.id;
      let sendData = new FormData();
      sendData.append("examID", examID);

      fetch("./takeExam.php", {
        method: "POST",
        body: sendData
      })
        .then(res => res.json())
        .then(({ examData }) => {
          let examArea = document.getElementsByClassName("examArea");
          examQuestions = examData;
          let buf = '';
          for (var i = 0; i < examData.length; i++) {
            buf += `<div class="questionArea">
            <div class="question">`+ examData[i]["Question"] +
              `&nbsp (` + examData[i]["Points"] + `&nbsp pts)</div>
            <div class="answerArea">
                <textarea rows = "12" cols= "60"class="answer">
                </textarea>
            </div>
        </div>`
          }
          examArea[0].innerHTML = buf;
        });
    };
  }
}
function submitExam() {
  let studentResponses = new FormData();
  studentResponses.append("User", "Sohan");
  studentResponses.append("testID", examID) //do intval in phps
  let responses = document.getElementsByTagName("textarea")
  for (var i = 0; i < responses.length; i++) {
    let question = examQuestions[i]["Question"];
    let questionID = examQuestions[i]["QuestionId"];
    let response = responses[i].value;
    // alert(questionID)
    //alert(response);
    studentResponses.append('Responses[' + i + '][question]', question);
    studentResponses.append('Responses[' + i + '][questionID]', Number(questionID));
    studentResponses.append('Responses[' + i + '][response]', response.trim());
  }

  //Sending the responses to grade
  fetch("./gradeExam.php", {
    method: "POST",
    body: studentResponses
  })
  .then(res => res.json())
  .then(res => console.log(res))
  let data = new FormData();
  data.append("examID", examID);
  fetch("./examTaken.php", {
    method: "POST",
    body: data
  })
  
  //location.reload()
}
