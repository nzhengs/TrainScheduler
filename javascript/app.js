$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBFD2WS-Ymp1JAU1War4fewR2rK7szDETk",
    authDomain: "mytrain-31c64.firebaseapp.com",
    databaseURL: "https://mytrain-31c64.firebaseio.com",
    projectId: "mytrain-31c64",
    storageBucket: "",
    messagingSenderId: "427765958776"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  var nextArrival;
  var minurteAway;

  database
    .ref()
    .orderByChild("dateAdded")
    .on("child_added", function(childSnapshot) {
      const trainSchedule = getTrainSchedule(childSnapshot.val());
      addRow(trainSchedule);
    });

  function getTrainSchedule(firebaseData) {
    const trainSchedule = {
      trainName: firebaseData.trainName,
      destination: firebaseData.destination,
      firstTrainTime: firebaseData.firstTrainTime,
      frequency: firebaseData.frequency
    };

    return trainSchedule;
  }

  function addRow(trainSchedule) {
    var row = $("<tr>");
    var trainNameCol = $("<td>");
    var destinationCol = $("<td>");
    var frequencyCol = $("<td>");
    var nextArrivalCol = $("<td>");
    var minuteAwayCol = $("<td>");

    trainNameCol.text(trainSchedule.trainName);
    destinationCol.text(trainSchedule.destination);
    frequencyCol.text(trainSchedule.frequency);

    row.append(trainNameCol);
    row.append(destinationCol);
    row.append(frequencyCol);
    row.append(nextArrivalCol);
    row.append(minuteAwayCol);

    $("#trainSchedule tbody").append(row);
  }
  $("#add-train").click(function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val();
    var destination = $("#destination").val();
    var firstTrainTime = $("#first-train-time").val();
    var frequency = $("#frequency").val();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    var trainSchedule = {
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    database.ref().push(trainSchedule);
  });
});
