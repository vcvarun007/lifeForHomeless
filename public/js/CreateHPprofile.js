$(document).ready(function () {
  $("#submitHPProfile").click(function () {
    if (
      $("#fname").val() !== "" &&
      $("#lname").val() !== "" &&
      $("#age").val() !== "" &&
      $("#idNo").val() !== "" &&
      $("#check").prop("checked") === true
    ) {
      alert("Profile Created!");
    }
  });

  $(".dropdown-menu a").click(function () {
    var selectedValue = $(this).text();
    console.log(selectedValue);
    $(".dropdown-toggle").text(selectedValue);
    // $("select").val("2");
    $("#idProof").val(selectedValue);
  });
});
