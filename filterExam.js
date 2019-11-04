let search = document.getElementsByName("Search")[0];
let difficulty = document.getElementsByName("filterD")[0];
let category = document.getElementsByName("filterCA")[0];
let constraint = document.getElementsByName("filterCS")[0];
function filter(){
    search.value == "" ? Search = '`Question`' : Search = '"%'+search.value+'%"'
    difficulty.value == "" ? Difficulty = '`Difficulty`' : Difficulty = '"'+difficulty.value+'"'
    category.value == "" ? Category = '`Category`' : Category = '"'+category.value+'"'
    constraint.value == "" ? Constraint = '`Constraints`' : Constraint = '"%'+constraint.value+'%"' 

    Search = Search.replace('_', '\\_')
    
    let sendData = new FormData();
    sendData.append("Question", Search);
    sendData.append("Difficulty", Difficulty);
    sendData.append("Category", Category);
    sendData.append("Constraint", Constraint);

    fetch("./filter.php",{
        method: "POST",
        body: sendData
    })

    .then(res => res.json())
    .then(({ data }) => {
        if(data == "None"){
            qb[0].innerHTML = "No Match Found";
        }
        else{
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
        }
      });
}
search.onkeyup = function(e){
    filter()
}

difficulty.onchange = function(e){
    filter()
}
category.onchange = function(e){
    filter()
}
constraint.onchange = function(e){
   filter()
}