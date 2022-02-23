import { createRoom, updateTimerStatus } from "../firebase.js";

const create_room = document.getElementById("create_room");
const room_id = document.getElementById("room_id");
const Start_timer = document.getElementById("Start_timer");

const host_id = Math.floor(Math.random() * 99999 + 10000);

create_room.addEventListener("click", (e) => {
  e.preventDefault();
  room_id.textContent = host_id;
  let room_detail = {
    host_room_id: host_id,
    gameStatus: 1,
    gameRound: 1,
    timerStatus: false,
  };
  createRoom(room_detail);
});

Start_timer.addEventListener("click", (e) => {
  e.preventDefault();
  let status_detail = {
    timerStatus: true,
  };
  updateTimerStatus(status_detail);
});
