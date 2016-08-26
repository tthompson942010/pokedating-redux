// Initialize Firebase
    var config = {
      apiKey: "AIzaSyBEqFl3BXnWkAUERtW56Kd8uCh5TAw3XBY",
      authDomain: "dating-go.firebaseapp.com",
      databaseURL: "https://dating-go.firebaseio.com",
      storageBucket: "dating-go.appspot.com",
    };
    firebase.initializeApp(config);

// Create a variable to reference the database.

var database = firebase.database()  




   

for (var i=1; i <= 5; i++) {
    // Minimum 0 and maximum 60%. You can change that.  
    var x = Math.max(0, Math.min(60, Math.ceil(Math.random() * 100)));
    var y = Math.max(0, Math.min(60, Math.ceil(Math.random() * 100)));
   
   // Creates div and appends to map - done, but doesn't properly append. 
   $('<div class="users"> </div>').css({
        position: 'absolute',
        width: '100px',
        height: '100px',
        top: y + '%',
        left: x + '%',
        'background-color': 'white'
    }).text('Name: ').appendTo('#pleaseWork');

 }

  // Pulls from Firebase and pushes data to divs - not done. 
 $(document).ready(function() { 
  // Grabbed values from text boxes
  info = $('.users').val().trim();
  // Code for handling the push
  database.ref().push({
    gender: gender,
  });
  // Don't refresh the page!
  return false;
  });
    






