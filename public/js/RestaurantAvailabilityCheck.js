$(document).ready(function () {
  getAvailableFoodData();
});

const getAvailableFoodData = () => {
  $.get("/views/RestaurantAvailabilityCheck", (res, err) => {
    if (res.statusCode == 200) {
      getAvailableFood(res.data);
    } else {
      console.log(err);
    }
  });
};
const getAvailableFood = (availableFood) => {
  availableFood.forEach((foodItem) => {
    let appendFood =
      "<tr>" +
      "<td>" +
      foodItem.type +
      "</td>" +
      "<td>200</td>" +
      "<td>Vegetarian</td>" +
      "<td>John Doe</td>" +
      "<td>New York</td>" +
      "</tr>";
    $("#foodTable").append(appendFood);
  });
};
