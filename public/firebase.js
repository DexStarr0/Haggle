import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZQE1m-U0eLuUamdJLjllP6WdfdODNR14",
  authDomain: "realtime-haggle.firebaseapp.com",
  databaseURL: "https://realtime-haggle-default-rtdb.firebaseio.com",
  projectId: "realtime-haggle",
  storageBucket: "realtime-haggle.appspot.com",
  messagingSenderId: "782897742587",
  appId: "1:782897742587:web:33a4ac340c737bf483e65e",
  measurementId: "G-QGDK7T8KC0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

const db = getDatabase();
const dbref = ref(db);
// reference for user data

export let firstName1;
let userRoomId1;
let userword;
let gameStatus;
let timerStatus;
let gameRound;
// Reference

// insert player data
export function InsertData(player_detail) {
  firstName1 = player_detail.Name;
  userRoomId1 = player_detail.roomId;
  if (player_detail.Name == "" || player_detail.roomId == "") {
    alert("You are missing some detail ");
  } else {
    get(child(dbref, `${userRoomId1}`)).then((snapshot) => {
      if (snapshot.exists()) {
        set(child(dbref, `${userRoomId1}/players/${firstName1}`), {
          Name: player_detail.Name,
          Score: player_detail.Score,
        })
          .then(() => {
            submitbtn.disabled = true;
            next_game.click();
            alert("data has stored");
          })
          .catch((error) => {
            alert("unsuccessful " + error);
          });
      } else {
        alert("room id is not found");
      }
    });
  }
}
// update word
export function updateWord(userWord) {
  userword = userWord.word;
  if (userword == "") {
    alert("word section is empty");
  } else {
    update(child(dbref, `${userRoomId1}/players/${firstName1}`), {
      userword: userword,
    })
      .then(() => {
        alert("data has stored");
      })
      .catch((error) => {
        alert("unsuccessful " + error);
      });
  }
}
//create a room
export function createRoom(room_detail) {
  userRoomId1 = room_detail.host_room_id;
  gameStatus = room_detail.gameStatus;
  gameRound = room_detail.gameRound;
  timerStatus = room_detail.timerStatus;
  set(child(dbref, `${userRoomId1}`), {
    gameStatus: gameStatus,
    timerStatus: timerStatus,
    round: gameRound,
  })
    .then(() => {
      create_room.disabled = true;
      alert("room has been created");
    })
    .catch((error) => {
      alert("unsuccessful " + error);
    });
}
// update timerStatus
export function updateTimerStatus(status_detail) {
  timerStatus = status_detail.timerStatus;
  update(child(dbref, `${userRoomId1}`), {
    timerStatus: timerStatus,
  })
    .then(() => {
      Start_timer.disabled = true;
      alert("timer has started");
    })
    .catch((error) => {
      alert("unsuccessful " + error);
    });
}
//data recive
export function fbdata() {
  let curr_data = {
    username: firstName1,
    roomId: userRoomId1,
    userword: userword,
  };
  return curr_data;
}
