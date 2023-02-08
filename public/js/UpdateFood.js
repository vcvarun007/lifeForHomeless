/*const homelessPeople = [
    {
        rest_id: "1",
        rname: "Josh",
        rnumber: "788456345",
        food_type: "Vegitatian",
        qty: "1",
        location: "Burwood east",
    },
    {
      rest_id: "2",
      rname: "Asan",
      rnumber: "788456345",
      food_type: "nonVegitatian",
      qty: "2",
      location: "Deakin University",
    },
    {
        rest_id: "5",
        rname: "Melissa",
        rnumber: "788456345",
        food_type: "Vegitatian",
        qty: "5",
        location: "University of Melbourne",
    },
  ];
*/

//connect to the socket​

let socket = io();
socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})