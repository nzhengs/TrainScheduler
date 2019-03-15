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
    const tMinutesTillTrain = calculateMinutesAway(trainSchedule);

    const nextTrain = calculateTimeForTrain(tMinutesTillTrain);

    trainNameCol.text(trainSchedule.trainName);
    destinationCol.text(trainSchedule.destination);
    frequencyCol.text(trainSchedule.frequency);
    nextArrivalCol.text(nextTrain.format("HH:mm"));
    minuteAwayCol.text(tMinutesTillTrain);

    row.append(
      trainNameCol,
      destinationCol,
      frequencyCol,
      nextArrivalCol,
      minuteAwayCol
    );

    $("#trainSchedule tbody").append(row);
  }

  function calculateTimeForTrain(tMinutesTillTrain) {
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    return nextTrain;
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

  function calculateMinutesAway(trainSchedule) {
    var firstTrainTime = trainSchedule.firstTrainTime;
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(
      1,
      "years"
    );
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainSchedule.frequency;
    var tMinutesTillTrain = trainSchedule.frequency - tRemainder;
    return tMinutesTillTrain;
  }
});
