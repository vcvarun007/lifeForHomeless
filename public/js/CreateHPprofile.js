const homelessPeople = [
  {
    hpp_id: "001",
    fname: "Aman",
    lname: "Das",
    img_upload: "Empty",
    age: "19",
    idProof: "Voter ID",
    idNo: "VID12300",
  },
  {
    hpp_id: "002",
    fname: "Jaskirat",
    lname: "Singh",
    img_upload: "Empty",
    age: "21",
    idProof: "Passport",
    idNo: "S1237890",
  },
  {
    hpp_id: "003",
    fname: "Navin",
    lname: "Raaj",
    img_upload: "Empty",
    age: "23",
    idProof: "DL",
    idNo: "DL123789",
  },
];

const createHPProfile = (profiles) => {
  profiles.forEach((profile) => {
    let profileToAppend =
      '<div class="accordion" id="accordionExample">' +
      '<div class="accordion-item">' +
      '<h2 class="accordion-header" id="headingOne">' +
      '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' +
      profile.hpp_id +
      " - " +
      profile.fname +
      "</button>" +
      "</h2>" +
      '<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">' +
      '<div class="accordion-body">' +
      "<strong> This is the first items accordion body.</strong> <code>.accordion-body</code>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("#hpp-display-section").append(profileToAppend);
  });
};

function submitHPProfile() {
  alert("Profile created!");
  console.log("Profile created!");
}

$(document).ready(function () {
  console.log("CreateHPProfileJS - JQuery running on doc ready!");
  createHPProfile(homelessPeople);
});
