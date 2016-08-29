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
var users= [];
var usersID = [];
//var selectedUser;

loadusers = function() {
  // TODO(DEVELOPER): Load and listens for new messages.
  //reference to the /messages/ database path.
  this.usersRef = this.database.ref('users');
  //make sure we remove all previous listeners.
  this.usersRef.off();
  //loads the last 12 messages and listen for new ones.
  var setuser = function(data) {
    var val = data.val();
    users.push(val);
    console.log(val);

    populate = function(){
      var count;
    // Minimum 0 and maximum 60%. You can change that.  
    var x = Math.max(20, Math.min(60, Math.ceil(Math.random() * 100)));
    var y = Math.max(10, Math.min(50, Math.ceil(Math.random() * 100)));  
   // Creates div and appends to map - done, but doesn't properly append. 
   var pokeDiv = $('<div>').css({
        position: 'absolute',
        width: '100px',
        height: '100px',
        top: y + '%',
        left: x + '%',
    }).html(val.username +"<img src="+val.favpokeimg+">").appendTo('#pleaseWork');
   pokeDiv.attr("data-num", val.ID);
   pokeDiv.addClass("pokemon");
   pokeDiv.attr("id", val.ID);
   console.log(val.ID);
   count++

    };
    populate();
  }.bind(this);
  this.usersRef.limitToLast(4).on('child_added', setuser);
  this.usersRef.limitToLast(4).on('child_changed', setuser);
};
console.log(users);
//   firebase.database().ref().on("child_added", function(childSnapshot) {
//   // Log everything that's coming out of snapshot

//    for ( property in childSnapshot.val()){
//      usersID.push(property);
//      console.log(property);
//    };

//     for (var i=0; i < usersID.length; i++) {
//       users.push(childSnapshot.val()[Object.keys(childSnapshot.val())[i]]);
//       console.log(users);
//       console.log(childSnapshot.val()[Object.keys(childSnapshot.val())[i]])
//    }; 
//     console.log(usersID);
//     populate();
// });

   
// populate = function(){
// for (var i=0; i < 4; i++) {
//     // Minimum 0 and maximum 60%. You can change that.  
//     var x = Math.max(20, Math.min(60, Math.ceil(Math.random() * 100)));
//     var y = Math.max(10, Math.min(50, Math.ceil(Math.random() * 100)));
   
//    // Creates div and appends to map - done, but doesn't properly append. 
//    var pokeDiv = $('<div>').css({
//         position: 'absolute',
//         width: '100px',
//         height: '100px',
//         top: y + '%',
//         left: x + '%',
//     }).html(users[i].username +"<img src="+users[i].favpokeimg+">").appendTo('#pleaseWork');
//    pokeDiv.attr("data-num", i);
//    pokeDiv.addClass("pokemon")
//    pokeDiv.attr("id", "item-"+i)
   
//  };
// };

loadusers();

$(document).ready(function() { 

  $(document.body).on('click', '.pokemon', function(){
      
    // Get the todoNumber of the button from its data attribute.
    var pokeNumber = $(this).data("num");
     localStorage.setItem("selectedUser", pokeNumber);
    //selectedUser = users[pokeNumber];
    document.location.href = "userProfile.html";

});
  // Don't refresh the page!
  return false;
  });
    






