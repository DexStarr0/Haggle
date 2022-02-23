let first_name = document.querySelector("#firstName");
let user_room_id = document.querySelector("#user_room_id");
let submitbtn = document.querySelector("#submitbtn");
let submitbtn3 = document.querySelector("#submitbtn3");
let detail_test = {};
submitbtn.addEventListener("click", (e) => {
  detail_test = {
    firstName: first_name.value,
    userRoomId: user_room_id.value,
  };
});

submitbtn3.addEventListener("click", (e) => {
  console.log(detail_test);
  console.log("working");
});
console.log("working");
