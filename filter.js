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