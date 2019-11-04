let TC = document.getElementsByClassName("testCase");
function addTestCases() {
  var buf = `
  <b>Test Case:</b> <input class="testCaseInput"  type="text" id="TestCase" name="Testcase">     
  <b>Result:</b> <input class="result"  type="text" id="Anwser" name="Anwser">
  <br>`;
  TC[0].innerHTML += buf;
}
function sendQuestion(form) {
  //rank, diff, questionName, questionFunc,
  //Id, Question, Difficulty,Signature,Category)
  //send Question, Difficulty, Signature(function Name), Catergory(type)
  ajaxHolder = new XMLHttpRequest();
  ajaxHolder.open("POST", "./sendQuestion.php", true);
  ajaxHolder.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  ajaxHolder.onreadystatechange = function () {
    if (ajaxHolder.readyState == 4 && ajaxHolder.status == 200) {
      var response = ajaxHolder.responseText;
      //alert(response);
      //console.log(response);

      return;
    }
  };
  //var ucid = document.getElementById("ucid").value;
  // var pass = document.getElementById("pass").value;
  var Signature = document.getElementById("Signature").value;
  var Question = document.getElementById("Question").value;
  var Difficulty;
  var Category;
  radioButtons = document.getElementsByName("Difficulty");
  selectTopic = document.getElementsByName("Category");
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked == true) {
      Difficulty = radioButtons[i].value;
    }
  }
  for (var i = 0; i < selectTopic.length; i++) {
    if (selectTopic[i].checked == true) {
      Category = selectTopic[i].value;
    }
  }
  var TestCases = [];
  var Constraints = [];
  if(document.getElementById("return").checked == true){
    Constraints.push("RETURN");
  }
  if(document.getElementById("print").checked == true){
    Constraints.push("PRINT");
  }
  if(document.getElementById("for").checked == true){
    Constraints.push("FOR");
  }
  if(document.getElementById("while").checked == true){
    Constraints.push("WHILE");
  }
  var TestCase = document.getElementsByName("Testcase");
  var Anwser = document.getElementsByName("Anwser");
  for (var i = 0; i < TestCase.length; ++i) {
    let buf = Array();
    let test = TestCase[i].value;
    let Awnsers = Anwser[i].value;
    buf.push(test);
    buf.push(Awnsers);
    TestCases.push(buf);
  }
  var jsonFormData = {
    Signature: Signature,
    Question: Question,
    Difficulty: Difficulty,
    Category: Category,
    TestCases: TestCases,
    Constraints: Constraints
  };
  //alert(jsonFormData)
  //alert(JSON.stringify(jsonFormData));
  ajaxHolder.send(JSON.stringify(jsonFormData));
} //sendQ
let qb = document.getElementsByClassName("questionBank");
//console.log(qb);
fetch("./getQuestions.php")
  .then(res => res.json())
  .then(({ data }) => {
    let buf = ` <table style="width: 516px; height: 35px;">
    <tbody id = "qbank">
    <tr>
    <!--<th style="width: 191px; height: 23px;">Question Name</th>-->
    <th>Question</th><th></th>
    <th>Difficulty</th><th></th>
    <th>Categories</th><th></th>
    <th>Constraints</th>
    </tr>
   
    `;

    for (var i = 0; i < data.length; i++) {
      buf += "<tr>";
      let qName = data[i]["Question"];
      let difficulty = data[i]["Difficulty"];
      let Id = data[i]["Id"];
      let category = data[i]["Category"];
      let constraints = data[i]["Constraint"];
      buf +=
        "<td>" +
        qName +
        "</td><td>" +
        "</td><td>" +
        difficulty +
        "</td><td>" +
        "</td><td>" +
        category +
        "</td><td>"+
        "</td><td>"+
        constraints+
        "</td></tr>";
    }
    buf += " </tbody></table>";
    qb[0].innerHTML = buf;
    console.log(qb);
  });

