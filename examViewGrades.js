examStore = document.getElementsByClassName("examHolder");

function listExams() {
  fetch("./getExam.php?auth=student&request=viewGrades")
    .then(res => res.json())
    .then(({ data }) => {
      var i = 0;
      let buf = "";
      while (i < data.length) {
        buf +=
          "<div><input class='examButtons' type='button' value='Exam  " +
          data[i] +
          "'onclick='viewExam()' id = '" +
          data[i] +
          "'></div>";
        i++;
      }
      examStore[0].innerHTML = buf;   
    });
}

function viewExam() {
  let exams = document.getElementsByClassName("examButtons");
  //.querySelectorAll("div");
  let numExams = exams.length;
  //alert(numExams);
  for (var i = 0; i <= numExams; i += 1) {
    exams[i].onclick = function (e) {
      examID = this.id;
      let sendData = new FormData();
      
      sendData.append("examID", examID);

      fetch("./viewGrades.php", {
        method: "POST",
        body: sendData
      })
        .then(res => res.json())
        .then(({ data }) => {
          let examArea = document.getElementsByClassName("examArea");
          examQuestions = data;
          let buf = '';
          for (var i = 0; i < data.length; i++) {
            buf += `<div class="questionArea">
            <div class="question">`+ data[i]["Question"] +
              `&nbsp (`+data[i]["MaxPoints"]+`&nbsp pts)</div>
            <div class="answerArea">
                <textarea disabled style="margin: 4px; width: 348px; height: 186px;"class="answer">`+
                    data[i]["UserAnswer"]+
                `</textarea>
                <textarea disabled style="margin: 4px; width: 348px; height: 186px;" class="feedback">`+
                    data[i]["Feedback"]+
                `</textarea>
            </div>
            <div class="pointsArea">
                Points Awarded: <input disabled type = 'number' step = ".01" class="points"  value = '`+data[i]["Points"]+`'>
            </div>
        </div>`
          }
          examArea[0].innerHTML = buf;
        });
    };
  }
}

