import { InsertData, fbdata, firstName1 } from "../firebase.js";

let submitbtn = document.querySelector("#submitbtn");
let next_game = document.querySelector("#next_game");
let first_name = document.querySelector("#firstName");
let user_room_id = document.querySelector("#user_room_id");
submitbtn.addEventListener("click", (e) => {
  e.preventDefault();

  let firstName = first_name.value;
  let userRoomId = user_room_id.value;

  let player_detail = {
    Name: firstName,
    Score: 0,
    roomId: userRoomId,
  };
  InsertData(player_detail);
  // next_game.click();
});
