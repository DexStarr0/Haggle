import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import { initializeApp } from "firebase/app";
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

import {
  getDatabase,
  ref,
  get,
  set,
  onValue,
  child,
  update,
  remove,
} from "firebase/database";
import { setInterval } from "timers/promises";

const db = getDatabase();
const dbref = ref(db);
let user_detail = {
  firstName1: "null",
  userRoomId1: "null",
  userword: "null",
};
let players = [];
let curr_player = {
  Score: 0,
};
let players_word = [];

// firebase methods
//update word
function updateWord(user_detail) {
  if (user_detail.userword == "null") {
    alert("word section is empty");
  } else {
    update(
      child(
        dbref,
        `${user_detail.userRoomId1}/players/${user_detail.firstName1}`
      ),
      {
        userword: user_detail.userword,
      }
    );
  }
}
// get playerdata

function playerData(user_detail) {
  let dbref2 = ref(db, `${user_detail.userRoomId1}/players`);

  onValue(dbref2, (snapshot) => {
    players = [];

    snapshot.forEach((playersSnapshot) => {
      players.push(playersSnapshot.val());
    });
  });

  const dbref3 = ref(
    db,
    `${user_detail.userRoomId1}/players/${user_detail.firstName1}`
  );
  onValue(dbref3, (snapshot) => {
    curr_player = {};

    curr_player = snapshot.val();
  });
}
//update score
function updateScore(user_detail) {
  let dbref2 = ref(db, `${user_detail.userRoomId1}/players`);

  onValue(dbref2, (snapshot) => {
    players = [];
    players_word = [];
    snapshot.forEach((playersSnapshot) => {
      players.push(playersSnapshot.val());
      players_word.push(playersSnapshot.val().userword);
    });
  });
  let curr_score = players_word.filter(
    (v) => v === user_detail.userword
  ).length;
  // socre update
  update(
    child(
      dbref,
      `${user_detail.userRoomId1}/players/${user_detail.firstName1}`
    ),
    {
      Score: curr_score,
    }
  );
}

// app1
const app1 = express();

app1.set("view engine", "ejs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app1.use(express.static(path.join(__dirname, "dist")));

const port = 3000;

app1.use(express.json());
app1.use(bodyParser.urlencoded({ extended: true }));
app1.use(express.static("public"));

// home route

app1.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/index.html");
});

app1.post("/", (req, res) => {
  res.redirect("/game");
  user_detail.firstName1 = req.body.firstName;
  user_detail.userRoomId1 = req.body.user_room_id;
  playerData(user_detail);
});

// redirect to home
app1.post("/redirect_home", (req, res) => {
  res.redirect("/");
});
// host route

app1.get("/host", (req, res) => {
  res.sendFile(__dirname + "/public/views/host.html");
});

// redirect to host
app1.post("/redirect_host", (req, res) => {
  res.redirect("/host");
});

// game route
app1.get("/game", (req, res) => {
  res.render("game", { score: curr_player.Score, round: "0" });
});

app1.post("/game", (req, res) => {
  user_detail.userword = req.body.user_word;
  updateWord(user_detail);
  updateScore(user_detail);
  res.redirect("/nextround");
});

// nextround route
app1.get("/nextround", (req, res) => {
  res.render("nextround", { players_leaderboard: players });
});

app1.listen(port, () => {
  console.log(`port is listing at ${port}`);
});
// user name and room id
