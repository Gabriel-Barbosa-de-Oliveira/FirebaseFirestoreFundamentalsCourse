$(document).ready(function() {
  //get all the data on app startup
  LoadData();

  function LoadData() {
    employeesRef.get().then(function(querySnapshot) {
      LoadTableData(querySnapshot);
    });

    function LoadTableData(querySnapshot) {
      var tableRow = "";
      querySnapshot.forEach(function(doc) {
        var document = doc.data();
        tableRow += "<tr>";
        tableRow += '<td class="fname">' + document.fName + "</td>";
        tableRow += '<td class="lname">' + document.lName + "</td>";
        tableRow += '<td class="email">' + document.email + "</td>";
        tableRow += '<td class="age">' + document.age + "</td>";
        tableRow += '<td class="gender">' + document.gender + "</td>";
        tableRow +=
          '<td class="yearsofexperience">' +
          document.yearsOfExperience +
          "</td>";
        tableRow += '<td class="isfulltime">' + document.isFullTime + "</td>";
        tableRow +=
          '<td class="editEmployee"><i class="fa fa-pencil" aria-hidden="true" style="color:green"></i></td>';
        tableRow +=
          '<td class="deleteEmployee"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></td>';
        tableRow += "</tr>";
      });
      $("tbody.tbodyData").html(tableRow);
    }
  }

  $("#createEmployee").click(function() {
    $(".employeeForm").css("display", "block");
    $("#dynamicBtn").text("Save Changes");
  });

  $("#dynamicBtn").click(function() {
    //employee form values
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#email").val();
    var age = $("#age").val();
    var gender = $("#gender").val();
    var yearsOfExperience = $("#yearsOfExperience").val();
    var isfulltime = $("#isFullTime").is(":checked");

    //check if you need to create or update an employee
    if ($(this).text() == "Save Changes") {
      //Add an Employee with Document name as (first letter of firstname).(lastname)
      //Example: Gabriel Barbosa -> G.barbosa
      var docuName = fname.charAt(0) + "." + lname;
      db.collection("employess")
        .doc(docuName)
        .set({
          fName: fname,
          lName: lname,
          email: email,
          age: age,
          gender: gender,
          yearsOfExperience: yearsOfExperience,
          isFullTime: isfulltime
        })
        .then(function(docRef) {
          $("#operationStatus")
            .html(
              '<div class="alert alert-success"><strong>Success!</strong> Employee Was Created!</div>'
            )
            .delay(2500)
            .fadeOut("slow");
          $(".employeeForm").css("display", "none");
          LoadData();
        })
        .catch(function(error) {
          $("#operationStatus")
            .html(
              '<div class="alert alert-danger"><strong>ERROR!</strong> Employee Was NOT Created!</div>'
            )
            .delay(2500)
            .fadeOut("slow");
        });
    } else {
      var docuName = fname.charAt(0) + "." + lname;
      var sfDocref = db.collection("employess").doc(docuName);
      sfDocref
        .set(
          {
            fName: fname,
            lName: lname,
            email: email,
            age: age,
            gender: gender,
            yearsOfExperience: yearsOfExperience,
            isFullTime: isfulltime
          },
          {
            merge: true
          }
        )
        .then(function() {
          $("#operationStatus")
            .html(
              '<div class="alert alert-success"><strong>Success!</strong> Employee Was Created!</div>'
            )
            .delay(2500)
            .fadeOut("slow");
          $(".employeeForm").css("display", "none");
          LoadData();
        })
        .catch(function(error) {
          $("#operationStatus")
            .html(
              '<div class="alert alert-danger"><strong>ERROR!</strong> Employee Was NOT Created!</div>'
            )
            .delay(2500)
            .fadeOut("slow");
        });
    }
  });

  // Cancel the Employee form
  $("#cancel").click(function() {
    $(".employeeForm").css("display", "none");
  });

  // Get the data of the employee you want to edit
  $("tbody.tbodyData").on("click", "td.editEmployee", function() {
    $(".employeeForm").css("display", "block");
    $("#dynamicBtn").text("Update Employee");

    $("#fname").val(
      $(this)
        .closest("tr")
        .find(".fname")
        .text()
    );
    $("#lname").val(
      $(this)
        .closest("tr")
        .find(".lname")
        .text()
    );
    $("#email").val(
      $(this)
        .closest("tr")
        .find(".email")
        .text()
    );
    $("#age").val(
      $(this)
        .closest("tr")
        .find(".age")
        .text()
    );
    $("#gender").val(
      $(this)
        .closest("tr")
        .find(".gender")
        .text()
    );
    $("#yearsOfExperience").val(
      $(this)
        .closest("tr")
        .find(".yearsofexperience")
        .text()
    );
    $("#isFullTime").prop(
      "checked",
      $(this)
        .closest("tr")
        .find(".isfulltime")
        .text() === "true"
    );
  });

  // Delete employee
  $("tbody.tbodyData").on("click", "td.deleteEmployee", function() {
    //Get the Employee Data
    var fName = $(this)
      .closest("tr")
      .find(".fname")
      .text(); //First Name
    var lName = $(this)
      .closest("tr")
      .find(".lname")
      .text(); //Last Name
    var docuName = fName.charAt(0) + "." + lName;
    db.collection("employess")
      .doc(docuName)
      .delete()
      .then(function() {
        $("#operationStatus")
          .html(
            '<div class="alert alert-success"><strong>Success!</strong> Employee Was Created!</div>'
          )
          .delay(2500)
          .fadeOut("slow");
        $(".employeeForm").css("display", "none");
        LoadData();
      })
      .catch(function(error) {
        $("#operationStatus")
          .html(
            '<div class="alert alert-danger"><strong>ERROR!</strong> Employee Was NOT Created!</div>'
          )
          .delay(2500)
          .fadeOut("slow");
      });
  });

  $("#searchEmployee").change(function() {
    console.log("You entered: ", $(this).val());
  });
});
