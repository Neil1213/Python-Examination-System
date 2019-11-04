function loginValidator(form) {
  ajaxHolder = new XMLHttpRequest();
  ajaxHolder.open("POST", "./login.php", true);
  ajaxHolder.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  ajaxHolder.onreadystatechange = function () {
    if (ajaxHolder.readyState == 4 && ajaxHolder.status == 200) {
      //alert(this.responseText);
      //alert(this.responseXML);
      //this.responseText
      //document.getElementById("errorHolder").innerHTML =
      // ajaxHolder.responseText;
      var response = ajaxHolder.responseText;
      //alert(response);
      console.log(response);
      //alert(response);
      if (response.includes("fail")) {
        document.getElementById("errorHolder").innerHTML =
          "Incorrect Username and Password";
      }
      if (response.includes("student")) {
        window.location.replace("./studentPage.html");
      } else if (response.includes("teacher")) {
        window.location.replace("./instructorPage.html");
      }
      //alert(ajaxHolder.getAllResponseHeaders());
      return;
    }
  };
  var ucid = document.getElementById("ucid").value;
  var pass = document.getElementById("pass").value;
  var jsonFormData = { ucid: ucid, pass: pass };
  //alert(JSON.stringify(jsonFormData));
  ajaxHolder.send(JSON.stringify(jsonFormData));
}
