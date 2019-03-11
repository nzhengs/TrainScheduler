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
  var trainName;
  var destination;
  var firstTrainTime;
  var frequency;
  var nextArrival;
  var minurteAway;

  $("#add-train").click(function(event) {
    event.preventDefault();

    trainName = $("#train-name").val();
    destination = $("#destination").val();
    firstTrainTime = $("#first-train-time").val();
    frequency = $("#frequency").val();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // database.ref().push({
    //   Name: employeeName,
    //   Role: role,
    //   StartDate: startDate,
    //   MonthlyRate: monthlyRate,
    //   dateAdded: firebase.database.ServerValue.TIMESTAMP
    // });
  });
});
